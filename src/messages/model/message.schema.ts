import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";



@Schema()

export class Message extends Document{
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
        senderId: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
        receiverId: string;

    @Prop({ type: String, required: true })
        content: string;

    @Prop({ type: Date, default: Date.now })
        timestamp: Date;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
