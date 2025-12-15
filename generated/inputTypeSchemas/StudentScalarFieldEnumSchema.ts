import { z } from 'zod';

export const StudentScalarFieldEnumSchema = z.enum(['id','name','email','mobile','gender','age','country','state','city','studentIdNumber','degreeProgram','createdAt','updatedAt','userId','image']);

export default StudentScalarFieldEnumSchema;
