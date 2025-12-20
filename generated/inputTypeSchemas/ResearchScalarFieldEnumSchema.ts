import { z } from 'zod';

export const ResearchScalarFieldEnumSchema = z.enum(['id','title','description','publicationDate','journal','volume','issue','link','createdAt','updatedAt']);

export default ResearchScalarFieldEnumSchema;
