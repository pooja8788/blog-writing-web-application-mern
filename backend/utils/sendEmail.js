import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail", // Or use your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, text) => {
  await transporter.sendMail({
    from: `"SwarLekhan" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    text,
  });
};

export default sendEmail;
