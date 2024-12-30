import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'shahin451999@gmail.com',
      pass: config.smtp_pass_key,
    },
  });

  await transporter.sendMail({
    from: 'shahin451999@gmail.com', // sender address
    to, // list of receivers
    subject: 'reset password link', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
