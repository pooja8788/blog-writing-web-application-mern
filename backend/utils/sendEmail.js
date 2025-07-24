import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, type, data }) => {
  let subject = "";
  let text = "";

  switch (type) {
    case "otp":
      subject = "Your OTP Code";
      text = `Your OTP code is: ${data.otp}`;
      break;

    case "verification":
      subject = "Email Verification - SwarLekhan";
      text = `Welcome to SwarLekhan! Please verify your email by clicking the link below:\n\n${data.verificationLink}`;
      break;

    default:
      throw new Error("Invalid email type specified");
  }

  await transporter.sendMail({
    from: `"SwarLekhan" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;
