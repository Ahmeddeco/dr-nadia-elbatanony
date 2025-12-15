import { z } from 'zod';
import { GenderSchema } from '../inputTypeSchemas/GenderSchema'
import { DegreeProgramSchema } from '../inputTypeSchemas/DegreeProgramSchema'

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
  gender: GenderSchema,
  degreeProgram: DegreeProgramSchema,
  id: z.string(),
  name: z.string(),
  email: z.string(),
  mobile: z.string(),
  age: z.number().nullish(),
  country: z.string().nullish(),
  state: z.string().nullish(),
  city: z.string().nullish(),
  studentIdNumber: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().nullish(),
  image: z.string(),
})

export type Student = z.infer<typeof StudentSchema>

export default StudentSchema;
