import { z } from 'zod';
import { GradeValueSchema } from '../inputTypeSchemas/GradeValueSchema'

/////////////////////////////////////////
// GRADE SCHEMA
/////////////////////////////////////////

export const GradeSchema = z.object({
  gradeValue: GradeValueSchema,
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  studentId: z.string(),
  courseId: z.string(),
})

export type Grade = z.infer<typeof GradeSchema>

export default GradeSchema;
