import { z } from 'zod'

export const CourseSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  description: z.string().nullish(),
  code: z.string(),
  content: z.string(),
  duration: z.number(),
  level: z.string(),
})

export type Course = z.infer<typeof CourseSchema>

export default CourseSchema
