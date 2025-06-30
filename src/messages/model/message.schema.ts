import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";



@Schema()

export class Message extends Document{
    @Prop({ type: Types.ObjectId, ref: 'User', })
        senderId: string;

    @Prop({ type: Types.ObjectId, ref: 'User',  })
        receiverId: string;

    @Prop({ type: String, required: true })
        content: string;

    @Prop({ type: Date, default: Date.now })
        timestamp: Date;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
