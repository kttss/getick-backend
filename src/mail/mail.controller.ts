import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MailService } from './mail.service';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('/sendmail')
  sendEmail(): any {
    // this.mailService.sendUserConfirmation('test').then();
    return 'send';
  }
}
