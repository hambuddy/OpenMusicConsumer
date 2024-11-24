/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const nodemailer = require('nodemailer');

class MailSender {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: "Open Music App",
            to: targetEmail,
            subject: 'Ekspor Lagu Playlist',
            text: 'Terlampir hasil dari ekspor lagu playlist',
            attachments: [
                {
                    filename: 'playlist.json',
                    content,
                },
            ],
        };

        return this._transporter.sendMail(message);
    }
}

module.exports = MailSender;