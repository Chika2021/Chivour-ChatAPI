import { Body, Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { Message } from './model/message.schema';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/users/jwt.auth.guard';
import { User } from 'src/users/model/users.schema';

@Controller('messages')
export class MessagesController {
    constructor(private messageService:MessagesService) {}
   

    @UseGuards(AuthGuard('jwt'))
    @Post()
        async sendMessage(@Body() messageDto: Message, @Request() req: any): Promise<Message> {
            return await this.messageService.createMessage(messageDto, req.user);
        }

    @UseGuards(AuthGuard('jwt'))
    @Get(':senderId')
        async getMessages(@Request() req, @Param('senderId') receiverId: string): Promise<Message[]> {
            const senderId = req.user.id;
            return await this.messageService.findMessages(senderId, receiverId)
        }




}
