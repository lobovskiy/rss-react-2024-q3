import type { FormData } from './schemas/formSchema.ts';

export type StoredFormData = Omit<FormData, 'picture'> & {
  id: string;
  picture: string;
};
