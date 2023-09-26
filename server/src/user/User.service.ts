import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { Model } from 'mongoose';

import { DatadogLogger } from '@logging';
import { User } from './User';
import { CreateUserDTO } from './User.dto';
import { UserDAO } from './User.schema';

@Injectable()
export class UserService {
    constructor(
        private readonly Logger: DatadogLogger,
        @InjectModel(UserDAO.name)
        private readonly userDAO: Model<UserDAO>
    ) {}

    public async createUser(createUserDto: CreateUserDTO) {
        this.Logger.log(`Creating user ${createUserDto.username}`);

        const salt = await genSalt(12);
        const hashedPassword = await hash(createUserDto.password, salt);

        const user: User = {
            username: createUserDto.username,
            locale: createUserDto.locale,
            account: {
                email: createUserDto.email,
                password: hashedPassword,
                emailVerifiedAt: undefined,
                lastLogin: undefined
            }
        };

        const { username, _id } = await this.userDAO.create(user);

        this.Logger.log(`User created: ${username}, ${_id}`);

        // todo send verification email
        return 'ok';
    }
}
