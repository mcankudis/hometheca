import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';

import { EnvVars } from '@config';
import { DatadogLogger } from '@logging';
import { MailService } from '@mail';
import { User } from './User';
import { CreateUserDTO } from './User.dto';
import { UserDAO } from './User.schema';
import { UserMailUtils } from './UserMail.utils';

// todo add rate limiting
@Injectable()
export class UserService {
    constructor(
        private readonly Logger: DatadogLogger,
        @InjectModel(UserDAO.name)
        private readonly userDAO: Model<UserDAO>,
        private readonly configService: ConfigService<EnvVars>,
        private readonly mailService: MailService
    ) {}

    public async createUser(createUserDto: CreateUserDTO) {
        this.Logger.log(`Creating user ${createUserDto.username}`);

        const salt = await genSalt(12);
        const hashedPassword = await hash(createUserDto.password, salt);
        const emailVerificationToken = randomUUID();

        const user: User = {
            username: createUserDto.username,
            locale: createUserDto.locale,
            account: {
                email: createUserDto.email,
                password: hashedPassword,
                emailVerifiedAt: undefined,
                emailVerificationToken,
                lastLogin: undefined
            }
        };

        const { username, _id } = await this.userDAO.create(user);

        this.Logger.log(`User created: ${username}, ${_id}, sending email`);

        const userMailUtils = new UserMailUtils(
            user,
            this.configService.get('SERVER_PATH')!
        );

        const subject = userMailUtils.getVerificationEmailSubject();
        const html = userMailUtils.getVerificationEmailHtml();
        const senderName = userMailUtils.getEmailSenderName();

        await this.mailService.sendMail({
            to: user.account.email,
            subject,
            senderName,
            html
        });

        this.Logger.log(`Email sent to ${_id}`);
    }

    public async verifyEmail(token: string) {
        this.Logger.log(`Verifying email for token ${token}`);

        const user = await this.userDAO.findOne({
            'account.emailVerificationToken': token
        });

        this.Logger.log(`User found: ${user?._id}`);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.account.emailVerificationToken !== token) {
            throw new Error('Invalid token');
        }

        user.account.emailVerifiedAt = new Date();
        user.account.emailVerificationToken = undefined;

        await user.save();

        this.Logger.log(`Email verified for user ${user._id}`);
    }

    public async authenticateUser(username: string, password: string) {
        this.Logger.log(`Authenticating user ${username}`);

        const user = await this.userDAO.findOne({ username });

        if (!user) {
            // todo sleep for a bit to prevent timing attacks
            throw new Error('Username or password incorrect');
        }

        const isPasswordCorrect = await compare(
            password,
            user.account.password
        );

        if (!isPasswordCorrect) {
            throw new Error('Username or password incorrect');
        }

        return {
            id: user._id.toString(),
            username: user.username,
            locale: user.locale
        };
    }
}
