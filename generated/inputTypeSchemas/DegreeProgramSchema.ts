import { z } from 'zod';

export const DegreeProgramSchema = z.enum(['master','phd']);

export type DegreeProgramType = `${z.infer<typeof DegreeProgramSchema>}`

export default DegreeProgramSchema;
