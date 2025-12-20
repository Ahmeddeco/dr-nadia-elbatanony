import { z } from 'zod';

/////////////////////////////////////////
// RESEARCH SCHEMA
/////////////////////////////////////////

export const ResearchSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  publicationDate: z.date(),
  journal: z.string(),
  volume: z.string(),
  issue: z.string(),
  link: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Research = z.infer<typeof ResearchSchema>

export default ResearchSchema;
