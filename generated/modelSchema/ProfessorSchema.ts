import { z } from 'zod';
import { GenderSchema } from '../inputTypeSchemas/GenderSchema'

/////////////////////////////////////////
// PROFESSOR SCHEMA
/////////////////////////////////////////

export const ProfessorSchema = z.object({
  gender: GenderSchema,
  id: z.string(),
  name: z.string(),
  image: z.string(),
  email: z.string(),
  mobile: z.string(),
  age: z.number().nullish(),
  country: z.string().nullish(),
  state: z.string().nullish(),
  city: z.string().nullish(),
  userId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Professor = z.infer<typeof ProfessorSchema>

export default ProfessorSchema;
