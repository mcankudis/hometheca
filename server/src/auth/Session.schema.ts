import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Session } from './Session';

@Schema({ timestamps: true, collection: 'Sessions' })
export class SessionDAO implements Session {
    @Prop({ index: true, required: true })
    userId: string;
    @Prop({ index: true, required: true })
    sessionId: string;
    @Prop({ required: true })
    expiresAt: Date;
    @Prop({ required: true })
    lastSeen: Date;
    @Prop()
    createdAt: Date;
    @Prop()
    updatedAt: Date;
}

export type SessionDocument = HydratedDocument<Session>;

export const SessionSchema = SchemaFactory.createForClass(SessionDAO);
