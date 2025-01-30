const verifyEmailTemplate = ({ name, url }) => {
  return `
  <p> Dear ${name}</p>
  <p> Thank You for registering Blinkeyit.</p>
  <a hr${url} style="color:white;background:#071263;margin-top: 10px;padding:20px">Verify Email
  </button>
  
  `

}

export default verifyEmailTemplate