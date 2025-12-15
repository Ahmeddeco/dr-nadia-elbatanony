import DegreeProgramSchema from '@/generated/inputTypeSchemas/DegreeProgramSchema'
import { z } from 'zod'

export const CourseSchema = z.object({
  level: DegreeProgramSchema,
  id: z.string().nullish(),
  title: z.string(),
  author: z.string(),
  description: z.string().nullish(),
  code: z.string(),
})

export type Course = z.infer<typeof CourseSchema>

export default CourseSchema
