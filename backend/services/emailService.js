const dns = require("dns");
const nodemailer = require("nodemailer");

// ======================================
// FORCE IPv4
// ======================================

dns.setDefaultResultOrder("ipv4first");

console.log("=================================");
console.log("EMAIL SERVICE LOADED");
console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);
console.log("=================================");

// ======================================
// CREATE TRANSPORTER
// ======================================

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,

  },

  requireTLS: true,

  connectionTimeout: 30000,

  greetingTimeout: 30000,

  socketTimeout: 30000,

  tls: {

    rejectUnauthorized: false,

  },

});

// ======================================
// SEND RESET EMAIL
// ======================================

const sendResetEmail = async (email, resetLink) => {

  console.log("=================================");
  console.log("Attempting to send reset email...");
  console.log("Recipient:", email);
  console.log("=================================");

  try {

    console.log("STEP 1: Preparing email...");

    const mailOptions = {

      from: `"Faculty MIS" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "Password Reset",

      html: `
        <h2>Faculty Management Information System</h2>

        <p>You requested to reset your password.</p>

        <p>Please click the button below to reset your password.</p>

        <a href="${resetLink}"
           style="
             display:inline-block;
             padding:12px 20px;
             background:#1976d2;
             color:#ffffff;
             text-decoration:none;
             border-radius:6px;
             font-weight:bold;">
          Reset Password
        </a>

        <br><br>

        <p>If you did not request this password reset, please ignore this email.</p>

        <p>This link expires in 1 hour.</p>
      `

    };

    console.log("STEP 2: Verifying SMTP connection...");

await transporter.verify();

console.log("SMTP verification succeeded");

console.log("STEP 3: Calling transporter.sendMail()...");

const info = await transporter.sendMail(mailOptions);

console.log("STEP 4: Email sent successfully.");
console.log("Message ID:", info.messageId);

    return info;

  } catch (error) {

    console.error("=================================");
    console.error("SMTP ERROR");
    console.error(error);
    console.error("=================================");

    throw error;

  }

};

module.exports = sendResetEmail;