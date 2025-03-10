function setCorsHeaders(req, res, next) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  }
  catch (error) {
    return response.status(500).json({
      message: "You have not Logined...",
      error: true,
      success: false
    })

  }
}

export default setCorsHeaders