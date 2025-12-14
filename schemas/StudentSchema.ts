import DegreeProgramSchema from '@/generated/inputTypeSchemas/DegreeProgramSchema'
import GenderSchema from '@/generated/inputTypeSchemas/GenderSchema'
import { z } from 'zod'

export const StudentSchema = z.object({
  gender: GenderSchema,
  degreeProgram: DegreeProgramSchema,
  id: z.string().nullish(),
  name: z.string(),
  email: z.string().email(),
  mobile: z.string().min(10).max(14),
  age: z.number().nullish(),
  studentIdNumber: z.string().nullish(),
  country: z.string().nullish(),
  state: z.string().nullish(),
  city: z.string().nullish(),
  image: z.string(),
  userId: z.string().nullish(),
})

export type Student = z.infer<typeof StudentSchema>

export default StudentSchema
