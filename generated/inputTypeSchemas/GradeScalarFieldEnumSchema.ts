import { z } from 'zod';

export const GradeScalarFieldEnumSchema = z.enum(['id','gradeValue','createdAt','updatedAt','studentId','courseId']);

export default GradeScalarFieldEnumSchema;
