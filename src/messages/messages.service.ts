import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './model/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message.name) private messageRepository:Model<Message>) {}

    async createMessage(messageDto: Message): Promise<Message> {
        const message = await this.messageRepository.create(messageDto);
        return message;
    }

    async findMessages(senderId:string, receiverId:string): Promise<Message[]> {
        const messages = await this.messageRepository.find(
            {
                $or: [
                    {senderId , receiverId},
                    {senderId: receiverId, receiverId: senderId}
                ]
            }
        ).sort({ timestamp: 1 });
        return messages;
    }
}
