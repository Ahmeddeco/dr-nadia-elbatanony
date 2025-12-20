import { z } from 'zod';
import { DegreeProgramSchema } from '../inputTypeSchemas/DegreeProgramSchema'

/////////////////////////////////////////
// COURSE SCHEMA
/////////////////////////////////////////

export const CourseSchema = z.object({
  level: DegreeProgramSchema,
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  code: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Course = z.infer<typeof CourseSchema>

export default CourseSchema;
