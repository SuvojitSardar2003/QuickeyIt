const forgotPasswordTemplate = ({ name, otp }) =>{
    return `
    <div> Dear, ${name}</div>
    <p> You're requested a password reset. Please use following OTP code to reset your password.</p>
    <div style="background:yellow;font-size:20px;padding:20px;text-align:center;font-weight:800;"> ${otp} </div>
    <p>This OTP is valid for 1 hour only.Enter this OTP in the QuickeyIt website to proceed with resetting your password.</p>
    <br/>
    <br/>
    <p>Thanks</p>
    <p>QuickeyIt</p>
    `
}

export default forgotPasswordTemplate