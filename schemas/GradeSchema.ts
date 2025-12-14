import GradeValueSchema from '@/generated/inputTypeSchemas/GradeValueSchema'
import { z } from 'zod'

export const GradeSchema = z.object({
  gradeValue: GradeValueSchema,
  id: z.string().nullish(),
  studentId: z.string(),
  courseId: z.string(),
})

export type Grade = z.infer<typeof GradeSchema>

export default GradeSchema
