import { Body, Controller, Post, Req, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { Message } from './model/message.schema';

@Controller('messages')
export class MessagesController {
    constructor(private messageService:MessagesService) {}

    @Post('create')
        async sendMessage(@Body() messageDto: Message, @Req() req: Request): Promise<Message> {
            return await this.messageService.createMessage(messageDto);
        }

}
