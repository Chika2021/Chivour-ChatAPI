import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './model/message.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/model/users.schema';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message.name) private messageRepository: Model<Message>,
                @InjectModel(User.name) private userRepository: Model<User>) {}

    async createMessage(messageDto: Message, user: User): Promise<any> {
        const message = await this.messageRepository.create(messageDto);
        const sender = await this.userRepository.findById(user._id);
        const receiver = await this.userRepository.findById(message.receiverId);
        if (!sender || !receiver) {
            throw new Error('Sender or receiver not found');
        }

        return  {
            _id: message._id,
            content: message.content,
            sender: user._id,
            receiver: message.receiverId,
        }
    }


   

    async findMessages(senderId:string, receiverId:string): Promise<Message[]> {
    
        const messages = await this.messageRepository.find(
            {
                $or: [
                    {senderId , receiverId},
                    {senderId: receiverId, receiverId: senderId}
                ]
            }
        ).sort({ createdAt: 1 })
          .populate('senderId', 'user.email')     //  Populates sender info
          .populate('receiverId', 'user.email')   //  Populates receiver info
          .exec();
          console.log(receiverId, senderId, messages);
        return messages;
    }
}