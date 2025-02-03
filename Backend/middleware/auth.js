import jwt from 'jsonwebtoken'


const auth = async (request, response, next) => {
  try {

    console.log("Cookies:", request.cookies);

    const token = request.cookies.accessToken || request?.header?.authorization?.split(" ")[1]

    console.log(token)

    if (!token) {
      return response.status(401).json({
        message: "Provide Token",
        error: true,
        success: false
      })

    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)

    if (!decode) {
      return response.status(401).json({
        message: "Unauthorized Access",
        error: true,
        success: false
      })
    }

    request.userId = decode.id

    next()

    // console.log("decode:",decode)

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })

  }
}

export default auth