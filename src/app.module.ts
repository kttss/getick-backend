import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

import { ProjectModule } from './project/project.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00.rdr5e.mongodb.net:27017,cluster0-shard-00-01.rdr5e.mongodb.net:27017,cluster0-shard-00-02.rdr5e.mongodb.net:27017/${process.env.MONGO_DATABASE}?ssl=true&replicaSet=atlas-rf80f7-shard-0&authSource=admin&retryWrites=true&w=majority`
    ),
    UserModule,
    AuthModule,
    MailModule,
    ProjectModule,
    TicketModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
