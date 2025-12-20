import { z } from 'zod';

export const ProfessorScalarFieldEnumSchema = z.enum(['id','name','image','email','mobile','gender','age','country','state','city','userId','createdAt','updatedAt']);

export default ProfessorScalarFieldEnumSchema;
