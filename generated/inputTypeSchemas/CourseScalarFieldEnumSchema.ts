import { z } from 'zod';

export const CourseScalarFieldEnumSchema = z.enum(['id','title','author','description','code','level','createdAt','updatedAt']);

export default CourseScalarFieldEnumSchema;
