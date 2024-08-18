import * as yup from 'yup';

import { COUNTRY_LIST } from '../constants.ts';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: yup.string().required('Gender is required'),
  terms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed<FileList>()
    .test(
      'fileSize',
      'File size too large',
      (value) => !value || value[0]?.size <= 1024 * 1024
    )
    .test(
      'fileType',
      'Unsupported file format',
      (value) => !value || ['image/jpeg', 'image/png'].includes(value[0]?.type)
    )
    .required('Picture is required'),
  country: yup
    .string()
    .oneOf(COUNTRY_LIST, 'Please select a country from the list')
    .required('Country is required'),
});

export type FormData = yup.InferType<typeof formSchema>;
