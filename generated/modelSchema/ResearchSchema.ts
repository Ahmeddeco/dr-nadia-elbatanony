import { z } from 'zod';

/////////////////////////////////////////
// RESEARCH SCHEMA
/////////////////////////////////////////

export const ResearchSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  publicationDate: z.date(),
  journal: z.string(),
  volume: z.string(),
  issue: z.string().nullish(),
  link: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Research = z.infer<typeof ResearchSchema>

export default ResearchSchema;
