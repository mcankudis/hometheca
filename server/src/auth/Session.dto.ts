import { z } from 'zod';

export const SessionTokenDTO = z.string().uuid();
