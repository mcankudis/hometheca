import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

import { DatadogLogger } from '@logging';

@Injectable()
export class MailService {
    private readonly transporter: Transporter;
    constructor(
        private readonly configService: ConfigService,
        private readonly Logger: DatadogLogger
    ) {
        this.Logger.log('Initializing mail service');

        this.transporter = createTransport({
            host: configService.get('MAIL_HOST'),
            port: 587,
            secure: false,
            auth: {
                user: configService.get('MAIL_USER'),
                pass: configService.get('MAIL_PASSWORD')
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    public async sendMail({
        to,
        subject,
        html,
        senderName
    }: {
        to: string;
        subject: string;
        html: string;
        senderName: string;
    }) {
        const mailOptions = {
            from: `"${senderName}" <${this.configService.get('MAIL_ADDRESS')}>`,
            to,
            subject,
            html
        };
        const info = await this.transporter.sendMail(mailOptions);

        this.Logger.log(`Message sent: ${info.messageId}`);
    }
}
