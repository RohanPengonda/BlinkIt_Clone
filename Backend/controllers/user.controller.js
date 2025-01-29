import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body



    if (!name || email || password) {
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