const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your Gmail address
        pass: process.env.EMAIL_PASS   // Your Gmail App Password
    }
});

// Function to send email immediately when an event is created
async function sendReminderEmail(to, eventName, eventDate) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: `Event Created: ${eventName}`,
        text: `Your event "${eventName}" is scheduled for ${new Date(eventDate).toLocaleString()}.`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(`📨 Email sent to ${to} - Message ID: ${info.messageId}`);
    } catch (error) {
        console.error(`❌ Failed to send email to ${to}:`, error);
    }
}

module.exports = sendReminderEmail;
