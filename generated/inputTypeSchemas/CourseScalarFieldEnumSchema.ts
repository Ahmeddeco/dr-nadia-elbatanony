import { z } from 'zod';

export const CourseScalarFieldEnumSchema = z.enum(['id','title','description','code','content','level','createdAt','updatedAt']);

export default CourseScalarFieldEnumSchema;
