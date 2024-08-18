import type { FormData } from './schemas/formSchema.ts';

export type StoredFormData = Omit<FormData, 'picture'> & { picture: string };
