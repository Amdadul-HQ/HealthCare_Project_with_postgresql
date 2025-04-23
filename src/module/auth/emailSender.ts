import nodemailer  from 'nodemailer'
import config from '../../app/config';

const emailSender = async (email: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.app_password,
    },
    tls:{
        rejectUnauthorized:false
    }
  });

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #4CAF50;">PH Health Care - Reset Your Password</h2>
      <p>Hello,</p>
      <p>You recently requested to reset your password. Click the button below to proceed:</p>
      <a href="${resetLink}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
      <p style="margin-top: 20px;">If you didn’t request a password reset, you can safely ignore this email.</p>
      <p>Thanks,<br />PH Health Care Team</p>
      <hr style="margin-top: 30px;" />
      <small style="color: #888;">This link will expire in 5 miniute for security reasons.</small>
    </div>
  `;

  const info = await transporter.sendMail({
    from: '"PH Health Care 👻" <rimonamdadul301@gmail.com>',
    to: email,
    subject: "Reset Your Password",
    text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    html: htmlTemplate,
  });

  console.log("Message sent: %s", info.messageId);
};

// main().catch(console.error);

export default emailSender;
