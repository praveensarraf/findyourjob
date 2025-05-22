import nodemailer from 'nodemailer';

export const sendEmail = async (recipientEmail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Message Received from Find-My-Job website',
        text: `Find-My-Job website have received a new email to connect at ${recipientEmail}!`,
        html: `<p style='background: darkred; color: gold; padding: 5px; margin-top: 20px; border: 2px solid gold; border-radius: 5px; text-align: center;'>Find-My-Job website have received a new email to connect at <span style='background: silver; color: darkred; font-weight: bold; padding: 2px; margin: 0 2px; '>${recipientEmail}</span>!</p>`
    };

    return transporter.sendMail(mailOptions);
};