import { z } from 'zod'

export const ResearchSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  description: z.string(),
  publicationDate: z.string(),
  journal: z.string(),
  volume: z.string(),
  issue: z.string(),
  link: z.string(),
})

export type Research = z.infer<typeof ResearchSchema>

export default ResearchSchema
