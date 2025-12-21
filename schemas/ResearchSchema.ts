import { z } from 'zod'

export const ResearchSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  description: z.string().nullish(),
  publicationDate: z.string(),
  journal: z.string(),
  volume: z.string(),
  issue: z.string().nullish(),
  link: z.string().nullish(),
})

export type Research = z.infer<typeof ResearchSchema>

export default ResearchSchema
