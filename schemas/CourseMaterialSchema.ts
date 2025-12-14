import { z } from 'zod'

export const CourseMaterialSchema = z.object({
  id: z.string().nullish(),
  type: z.string(),
  title: z.string(),
  url: z.string(),
  fileSize: z.number().nullish(),
  courseId: z.string().nullish(),
})

export type CourseMaterial = z.infer<typeof CourseMaterialSchema>

export default CourseMaterialSchema
