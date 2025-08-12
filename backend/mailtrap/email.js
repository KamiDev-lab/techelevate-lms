import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sender = {
  email: process.env.GMAIL_EMAIL_USER,
  name: "Syed Kamran Shah",
};

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = email;
  try {
    const res = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`, 
      to: recipient,
      subject: "Verify your email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
    });
    console.log("Email sent:", res);
  } catch (error) {
    console.error("Failed to send email verification:", error);
    throw new Error("Failed to send email verification");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = email;
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: recipient,
      subject: "Welcome to KMRN Eats",
      html: htmlContent,
    });
    console.log("Email sent:", res);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = email;
  const htmlContent = generatePasswordResetEmailHtml(resetURL);
  try {
    const res = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: recipient,
      subject: "Reset your password",
      html: htmlContent,
    });
    console.log("Email sent:", res);
  } catch (error) {
    console.error("Failed to reset password:", error);
    throw new Error("Failed to reset password");
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = email;
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: recipient,
      subject: "Password Reset Successfully",
      html: htmlContent,
    });
    console.log("Email sent:", res);
  } catch (error) {
    console.error("Failed to send password reset success email:", error);
    throw new Error("Failed to send password reset success email");
  }
};
