import nodemailer, { Transporter } from 'nodemailer'; 
import ejs from "ejs"; 
import path from "path"; 
// Define the type for the email sending options
interface EmailOptions {
  email: string;           
  subject: string;         
  template: string;        
  data: { [key: string]: any }; 
}

// The main function to send an email
const sendMail = async (options: EmailOptions): Promise<void> => {

  // Create a transporter object using SMTP settings from environment variables
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, 
    port: parseInt(process.env.SMTP_PORT || "587"), 
    service: process.env.SMTP_SERVICE, 
    auth: {
      user: process.env.SMTP_MAIL, 
      pass: process.env.SMTP_PASSWORD, //app password
    }
  });

  // Extract values from options
  const { email, subject, template, data } = options;

  // Create the full path to the EJS template file
  const templatePath = path.join(__dirname, '../mails', template);

  // Render the EJS template to HTML by injecting data into it
  const html: string = await ejs.renderFile(templatePath, data);

  // Setup the email content
  const mailOptions = {
    from: process.env.SMTP_MAIL, // sender email
    to: email,                   // Recipient
    subject,                     // Subject line
    html                         // The actual HTML email content
  };
  // Send the email using the transporter
  await transporter.sendMail(mailOptions);
};

export default sendMail;