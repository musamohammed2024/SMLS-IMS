const dns = require("dns");
const nodemailer = require("nodemailer");

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

console.log("RUNNING EMAIL SERVICE: SMTP 587 IPv4");

const sendResetEmail = async (email, resetLink) => {
  await transporter.sendMail({
    from: `"Faculty MIS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset",
    html: `
      <h2>Faculty Management Information System</h2>

      <p>You requested to reset your password.</p>

      <p>
        Click the link below to reset it:
      </p>

      <a href="${resetLink}">
        Reset Password
      </a>

      <p>
        If you did not request this, simply ignore this email.
      </p>
    `,
  });
};

module.exports = sendResetEmail;