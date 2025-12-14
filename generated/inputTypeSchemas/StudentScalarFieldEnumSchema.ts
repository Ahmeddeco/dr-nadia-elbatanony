import { z } from 'zod';

export const StudentScalarFieldEnumSchema = z.enum(['id','name','email','image','mobile','gender','age','country','state','city','studentIdNumber','degreeProgram','createdAt','updatedAt','userId']);

export default StudentScalarFieldEnumSchema;
