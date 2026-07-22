const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.resend.com',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendInvoiceEmail = async ({ to, subject, body, attachmentBuffer }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'invoices@ledger.app',
    to,
    subject,
    text: body,
    attachments: attachmentBuffer
      ? [
          {
            filename: 'Invoice.pdf',
            content: attachmentBuffer
          }
        ]
      : []
  };

  return await transporter.sendMail(mailOptions);
};