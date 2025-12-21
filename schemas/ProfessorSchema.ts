import GenderSchema from '@/generated/inputTypeSchemas/GenderSchema'
import { z } from 'zod'

export const ProfessorSchema = z.object({
  gender: GenderSchema,
  id: z.string().nullish(),
  name: z.string(),
  image: z.string().nullish(),
  email: z.string(),
  mobile: z.string().nullish(),
  age: z.number().min(32).max(100).nullish(),
  country: z.string().nullish(),
  state: z.string().nullish(),
  city: z.string().nullish(),
  userId: z.string().nullish(),

})

export type Professor = z.infer<typeof ProfessorSchema>

export default ProfessorSchema
