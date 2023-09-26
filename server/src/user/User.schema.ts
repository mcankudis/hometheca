import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Locale } from '@hometheca/shared';
import { User } from './User';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
class AccountDAO {
    @Prop({ index: true, required: true })
    email: string;
    @Prop({ type: Date })
    emailVerifiedAt?: Date;
    @Prop({ required: true })
    password: string;
    @Prop({ type: Date })
    lastLogin?: Date;
}

const AccountSchema = SchemaFactory.createForClass(AccountDAO);

@Schema({ timestamps: true, collection: 'Users' })
export class UserDAO implements User {
    @Prop({ index: true, required: true, unique: true })
    username: string;
    @Prop({ default: 'en', enum: Object.values(Locale), required: true })
    locale: Locale;
    @Prop({ required: true, type: AccountSchema })
    account: AccountDAO;
    @Prop()
    createdAt: Date;
    @Prop()
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDAO);
