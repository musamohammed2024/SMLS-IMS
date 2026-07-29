const dns = require("dns");
const nodemailer = require("nodemailer");

console.log("EMAIL SERVICE LOADED - IPv4 mode");

console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,

  tls: {
    rejectUnauthorized: false,
  },
});

const sendResetEmail = async (email, resetLink) => {

  console.log("Attempting to send reset email to:", email);

  try {
  await transporter.verify();

  console.log("SMTP verification succeeded");

  await transporter.sendMail({

    from: `"Faculty MIS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset",
    html: `
      <h2>Faculty Management Information System</h2>

      <p>You requested to reset your password.</p>

      <p>Click the button below to reset your password.</p>

      <a href="${resetLink}"
         style="padding:10px 20px;
                background:#1976d2;
                color:white;
                text-decoration:none;
                border-radius:5px;">
        Reset Password
      </a>

      <p>If you did not request this, ignore this email.</p>
    `,
  });

  console.log("Email sent successfully");

  } catch (error) {
  console.error("SMTP ERROR:", error);
  throw error;
}
};

module.exports = sendResetEmail;