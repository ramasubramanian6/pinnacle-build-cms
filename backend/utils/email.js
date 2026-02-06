const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1) Create a transporter
    let transporter;

    if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
        // Use SMTP
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    } else {
        // Dev: Log to console if no SMTP config
        console.log('WARNING: No EMAIL_HOST or EMAIL_USER in .env. Using mock sender.');
        transporter = {
            sendMail: async (mailOptions) => {
                console.log('-------------------------------------------');
                console.log('📧 EMAIL MOCK');
                console.log(`To: ${mailOptions.to}`);
                console.log(`Subject: ${mailOptions.subject}`);
                console.log(`Text: ${mailOptions.text}`);
                console.log('-------------------------------------------');
                return true;
            }
        }
    }

    // 2) Define the email options
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'BRIXXSPACE Support <support@brixxspace.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
