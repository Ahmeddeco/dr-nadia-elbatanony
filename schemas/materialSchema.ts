import { z } from 'zod'

export const MaterialSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  author: z.string(),
  description: z.string().nullish(),
  url: z.string(),
})

export type Material = z.infer<typeof MaterialSchema>

export default MaterialSchema