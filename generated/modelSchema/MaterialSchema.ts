import { z } from 'zod';

/////////////////////////////////////////
// MATERIAL SCHEMA
/////////////////////////////////////////

export const MaterialSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string().nullish(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Material = z.infer<typeof MaterialSchema>

export default MaterialSchema;
