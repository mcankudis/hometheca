import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';

import { DatadogLogger } from '@logging';
import { SessionTokenDTO } from './Session.dto';
import { SessionDAO } from './Session.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly Logger: DatadogLogger,
        @InjectModel(SessionDAO.name)
        private readonly sessionDAO: Model<SessionDAO>
    ) {}

    public async createSession(userId: string) {
        this.Logger.log(`Creating session for user ${userId}`);

        const sessionId = randomUUID();
        const expiresAt = dayjs().add(30, 'day').toDate();

        const session = await this.sessionDAO.create({
            userId,
            sessionId,
            lastSeen: new Date(),
            expiresAt
        });

        this.Logger.log(`Session created: ${session._id}`);

        return session;
    }

    public async verifySession(sessionTokenCookie?: string) {
        const sessionId = SessionTokenDTO.parse(sessionTokenCookie);

        this.Logger.log(`Verifying session ${sessionId}`);

        const session = await this.sessionDAO.findOne({ sessionId });

        if (!session) {
            throw new Error('Session not found');
        }

        if (session.expiresAt < new Date()) {
            throw new Error('Session expired');
        }

        this.Logger.log(`Session verified: ${session._id}`);

        return session;
    }
}
