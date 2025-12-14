import { z } from 'zod';

/////////////////////////////////////////
// COURSE MATERIAL SCHEMA
/////////////////////////////////////////

export const CourseMaterialSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  url: z.string(),
  courseId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type CourseMaterial = z.infer<typeof CourseMaterialSchema>

export default CourseMaterialSchema;
