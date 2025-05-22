import { sendEmail } from '../utils/emailService.js';

export const sendEmailHandler = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required!', success: false });
    }

    try {
        await sendEmail(email);
        res.status(200).json({ message: 'Email sent successfully!', success: true });
    } catch (error) {
        console.error(error);
    }
};
