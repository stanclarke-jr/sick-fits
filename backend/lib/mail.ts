import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const email = (text: string): string =>
  `
    <div style="
      font-family: sans-serif;
      font-size; 20px;
      line-height: 2;
      border: 1px solid black;
      padding: 20px;
     ">
        <h2>Hi There!</h2>
        <p>${text}</p>
        <p>😊, Stan Clarke, Jr.</p>
    </div>
  `;

export const sendPasswordResetEmail = async (
  resetToken: string,
  to: string
): Promise<void> => {
  // Email the user a token
  const info = await transporter.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your password reset token',
    html: email(`
      Your Password Reset Token is here!

      <a href="${process.env.FRONTEND_URL}/passwordreset?token=${resetToken}">Click here to reset your password</a>
    `),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log('📧 Message Sent! Preview it at: ', getTestMessageUrl(info));
  }
};
