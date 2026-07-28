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
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: false,
  },
});

console.log("RUNNING EMAIL SERVICE: SMTP 587 IPv4");

const sendResetEmail = async (email, resetLink) => {
  console.log("Attempting to send reset email to:", email);

  try {
    await transporter.verify();
    console.log("SMTP verification succeeded");
  } catch (err) {
    console.error("SMTP verification failed:", err);
    throw err;
  }

  await transporter.sendMail({
    from: `"Faculty MIS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset",
    html: `
      <h2>Faculty Management Information System</h2>

      <p>You requested to reset your password.</p>

      <p>Click the link below to reset it:</p>

      <p>
        <a href="${resetLink}">
          Reset Password
        </a>
      </p>

      <p>If you did not request this, simply ignore this email.</p>
    `,
  });

  console.log("Reset email sent successfully.");
};

module.exports = sendResetEmail;