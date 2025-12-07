import { z } from 'zod';

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Session = z.infer<typeof SessionSchema>

export default SessionSchema;
