import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(token: string): Promise<void> {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: 'kattouss.issam@gmail.com',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: 'issam',
        url
      }
    });
  }
}
