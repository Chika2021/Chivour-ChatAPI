import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './model/message.schema';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/model/users.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }, { name: User.name, schema: UserSchema }])
  ],
  providers: [MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule {}
