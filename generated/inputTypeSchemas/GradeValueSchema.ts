import { z } from 'zod';

export const GradeValueSchema = z.enum(['A','B','C','D','F']);

export type GradeValueType = `${z.infer<typeof GradeValueSchema>}`

export default GradeValueSchema;
