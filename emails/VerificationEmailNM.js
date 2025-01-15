function generateVerificationEmail(username, verifyCode) {
  return `
<!DOCTYPE html>
<html>

<head>
  <title>Email Verification</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h1 style="text-align: center; color: #2c7be5;">Email Verification</h1>
  <p>Hi ${username},</p>
  <p>
    Thank you for registering! Please use the following One-Time Password (OTP) to verify your email address:
  </p>
  <h2 style="text-align: center; color: #2c7be5;">${verifyCode}</h2>
  <p>This OTP will expire in 1 hour.</p>
  <p>Please do not share this OTP with anyone.</p>
  <p>Click the link below to verify your email address:</p>
  <p style="text-align: center;">
    <a href="http://localhost:3000/verify/${username}"
      style="color: white; background-color: #2c7be5; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
      Verify Email
    </a>
  </p>
  <p>If you didn’t request this, please ignore this email.</p>
  <p>Regards,<br />Mystery Message</p>
</body>

</html>
`;
}

module.exports = generateVerificationEmail;
