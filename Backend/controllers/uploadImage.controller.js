import { request, response } from "express";
import uploadImageClodinary from '../utils/uploadImageClodinary.js'

const uploadImageController = async (request, response) => {
  try {
    const file = request.file
    const uploadImage = await uploadImageClodinary(file)
    return response.json({
      message: "Image Uploaded",
      data: uploadImage,
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

export default uploadImageController