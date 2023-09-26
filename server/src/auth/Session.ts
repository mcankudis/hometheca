export interface Session {
    userId: string;
    sessionId: string;
    expiresAt: Date;
    lastSeen: Date;
    createdAt: Date;
    updatedAt: Date;
}
