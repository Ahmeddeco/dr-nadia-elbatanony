import { z } from 'zod';

export const CourseMaterialScalarFieldEnumSchema = z.enum(['id','type','title','url','courseId','createdAt','updatedAt']);

export default CourseMaterialScalarFieldEnumSchema;
