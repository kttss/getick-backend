import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: any, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.lastname + ' ' + user.firstname,
        url: `${process.env.CONFIRMATION_URL}${user.id}/${token}`
      }
    });
  }
}
