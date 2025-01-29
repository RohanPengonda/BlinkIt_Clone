const verifyEmailTemplate = ({ name, url }) => {
  return `
  <p> Dear ${name}</p>
  <p> Thank You for registering Blinkeyit.</p>
  <a hr${url} style="color:white;background:blue;margin-top: 10px">Verify Email
  </button>
  
  `

}

export default verifyEmailTemplate