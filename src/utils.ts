import * as yup from 'yup';

type ValidationResult<T> =
  | {
      valid: true;
    }
  | { valid: false; errors: Partial<Record<keyof T, string>> };

export function validateData<T extends object>(
  data: T,
  schema: yup.Schema
): ValidationResult<T> {
  try {
    schema.validateSync(data, { abortEarly: false });

    return { valid: true };
  } catch (error) {
    const formattedErrors: Partial<Record<keyof T, string>> = {};

    (error as yup.ValidationError).inner.forEach((error) => {
      if (error.path) {
        formattedErrors[error.path as keyof T] = error.message;
      }
    });

    return { valid: false, errors: formattedErrors };
  }
}
