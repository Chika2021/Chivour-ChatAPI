import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { Message } from './model/message.schema';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/users/jwt.auth.guard';

@Controller('messages')
export class MessagesController {
    constructor(private messageService:MessagesService) {}
   

    @UseGuards(AuthGuard('jwt'))
    @Post()
        async sendMessage(@Body() messageDto: Message, @Req() req: Request): Promise<Message> {
            return await this.messageService.createMessage(messageDto);
        }

    @UseGuards(AuthGuard('jwt'))
    @Get()
        async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
            return await this.messageService.findMessages(senderId, receiverId)
        }

}
