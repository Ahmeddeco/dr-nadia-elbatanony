import { z } from 'zod';

export const MaterialScalarFieldEnumSchema = z.enum(['id','title','author','description','url','createdAt','updatedAt']);

export default MaterialScalarFieldEnumSchema;
