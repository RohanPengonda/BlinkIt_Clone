import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import sendEmail from "../config/sendEmail.js";
import generatedAccessToken from '../utils/generatedAccessToken.js'
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import genertedRefreshToken from "../utils/genertedRefreshToken.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";


export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Provide Name,Email,Paasword",
        error: true,
        success: false
      })
    }

    const user = await UserModel.findOne({ email })
    if (user) {
      return response.status(400).json({
        message: "Already Register Email",
        error: true,
        success: false
      })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)

    const payload = { name, email, password: hashPassword }

    const newUser = new UserModel(payload)
    const save = await newUser.save()


    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify Email from Blinkit",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl
      })
    })

    return response.json({
      message: "User Registered Successfully",
      error: false,
      success: true,
      data: save
    })



  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }

}

export async function verifyEmailController(request, response) {
  try {
    const { code } = request.body

    const user = await UserModel.findOne({ _id: code })

    if (!user) {
      return response.status(400).json({
        message: "Invalid Code",
        error: true,
        success: false
      })

    }
    const updateUser = await UserModel.updateOne({ _id: code }, {
      verify_email: true
    })
    return response.json({
      message: "Verification True",
      error: true,
      success: false
    })



  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true
    })

  }

}

//Login Controller

export async function loginController(request, response) {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response.status(400).json({
        message: "Provide Email and Password",
        error: true,
        success: false
      })

    }

    const user = await UserModel.findOne({ email })
    if (!user) {
      return response.status(400).json({
        message: "User not Register",
        error: true,
        success: false
      })

    }
    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Contact to Admin",
        error: true,
        success: false
      })
    }

    const checkPassword = await bcryptjs.compare(password, user.password)

    if (!checkPassword) {
      return response.status(400).json({
        message: "Check Your Password",
        error: true,
        success: false
      })
    }

    const accesstoken = await generatedAccessToken(user._id)
    const refreshtoken = await genertedRefreshToken(user._id)

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date()
    })

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }

    response.cookie('accessToken', accesstoken, cookiesOption)
    response.cookie('refreshToken', refreshtoken, cookiesOption)

    return response.json({
      message: "Login SuccessFully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshtoken
      }
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })

  }

}

//Logout Controller

export async function logoutController(request, response) {
  try {

    const userid = request.userId //From middleware auth

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }

    response.clearCookie("accesstoken", cookiesOption)
    response.clearCookie("refreshtoken", cookiesOption)


    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: ""
    })

    return response.json({
      message: "Logout SuccessFully",
      error: false,
      success: true,
    })


  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })

  }

}

//upload user avatar

export async function uploadAvatar(request, response) {
  try {
    const userId = request.userId // auth middlware
    const image = request.file  // multer middleware

    const upload = await uploadImageClodinary(image)

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url
    })

    return response.json({
      message: "upload profile",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url
      }
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

//update user details
export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId //auth middleware
    const { name, email, mobile, password } = request.body
    const hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10)
      hashPassword = await bcryptjs.hash(password, salt)
    }

    const updateUser = await UserModel.updateOne({ _id: userId }, {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(mobile && { mobile: mobile }),
      ...(password && { password: hashPassword }),
    })

    return response.json({
      message: "Updated User Successfully",
      error: false,
      success: true,
      data: updateUser
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }

}

//forgot Password not login

export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body
    const user = await UserModel.findOne({ email })

    if (!user) {
      return response.status(400).json({
        message: "Email Not Available",
        error: true,
        success: false
      })
    }

    const otp = await generatedOtp()
    const expireTime = new Date() + 60 * 60 * 1000     //1hr

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forget_Password_Otp: otp,
      forget_Password_Expiry: new Date(expireTime).toISOString() //or we can save expire_Time also
    })

    await sendEmail({
      sendTo: email,
      subject: "Forgot Password from Blinkeyit",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp
      })
    })

    return response.json({
      message: "Otp Send Check Mail",
      error: false,
      success: true
    })


  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

//verify forgort password otp
export async function verifyForgotPasswordOtp(request, response) {

  try {
    const { email, otp } = request.body

    if (!email || !otp) {
      return response.status(400).json({
        message: "Provide required field email,otp.",
        error: true,
        success: false
      })
    }
    const user = await UserModel.findOne({ email })

    if (!user) {
      return response.status(400).json({
        message: "Email Not Available",
        error: true,
        success: false
      })
    }

    const currentTime = new Date()
    if (user.forgot_password_expiry < currentTime) {
      return response.status(400).json({
        message: "Otp is Expired",
        error: true,
        success: false
      })
    }

    if (otp !== user.forget_Password_Otp) {
      return response.status(400).json({
        message: "Invalid Otp",
        error: true,
        success: false
      })
    }

    //if otp is not expired
    //otp === user.forgot_password_otp

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      forget_Password_Otp: "",
      forget_Password_Expiry: ""
    })

    return response.json({
      message: "Verify OTP Successfully",
      error: false,
      success: true
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

//reset the Password
export async function resetPassword(request, response) {
  try {

    const { email, newPassword, confirmPassword } = request.body
    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: "Provide Required fields email,newPassword,confirmPassword",

      })
    }
    const user = await UserModel.findOne({ email })

    if (!user) {
      return response.status(400).json({
        message: "Email Not Available",
        error: true,
        success: false
      })
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "new and confirm Passwords are not same",
        error: true,
        success: false
      })
    }
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(newPassword, salt)
    const upadte = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword

    })

    return response.json({
      message: "Password Updated Successfully",
      error: false,
      success: true
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }

}

//refresh token controller

export async function refreshToken(request, response) {
  try {
    const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

    if (!refreshToken) {
      return response.status(401).json({
        message: "Invalid token",
        error: true,
        success: false
      })
    }

    const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)

    if (!verifyToken) {
      return response.status(401).json({
        message: "token is expired",
        error: true,
        success: false
      })
    }

    const userId = verifyToken?._id

    const newAccessToken = await generatedAccessToken(userId)

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }

    response.cookie('accessToken', newAccessToken, cookiesOption)

    return response.json({
      message: "New Access token generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken
      }
    })

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }


}

//get login user details
export async function userDetails(request, response) {
  try {
    const userId = request.userId

    console.log(userId)

    const user = await UserModel.findById(userId).select('-password -refresh_token')

    return response.json({
      message: 'user details',
      data: user,
      error: false,
      success: true
    })
  } catch (error) {
    return response.status(500).json({
      message: "Something is wrong",
      error: true,
      success: false
    })
  }
}