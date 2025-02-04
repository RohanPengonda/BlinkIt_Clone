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

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }

    response.cookie('accessToken', accesstoken, cookiesOption)
    response.cookie('refreshtoken', refreshtoken, cookiesOption)

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

    const otp = generatedOtp()
    const expireTime = new Date() + 60 * 60 * 1000     //1hr

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString() //or we can save expire_Time also
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