const verifyEmailTemplate = ({ name, url }) => {
  return `
  <p> Dear ${name}</p>
  <p> Thank You for registering Blinkeyit.</p>
  <a hr${url} style="color:orange;background:black;margin-top: 10px;padding:20px;display:block">Verify Email
  </button>
  
  `

}

export default verifyEmailTemplate