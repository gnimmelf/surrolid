import { Setter } from 'solid-js';
import { z, ZodSchema } from 'zod';

const reName = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u);
const rePhone = new RegExp(/^([\+][1-9]{2})?[ ]?([0-9 ]{8})$/);
const reStreet = new RegExp(/^[\p{L}'][ \p{L}\p{N}'-,]{8,}$/u);
// https://dev.to/rasaf_ibrahim/write-regex-password-validation-like-a-pro-5175
const rePass = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?!.* ).{3,16}$/)

export const email = z.string().trim().email('Must be a valid email address');
export const name = z.string().trim().regex(reName, 'Must be a valid name');

export const pass = z
  .string()
  .trim()
  .regex(rePass, 'Must be 3-16 charcters and contain one digit and a special char')

export const address = z
  .string()
  .trim()
  .regex(reStreet, 'Must be a valid street address')
  .or(z.literal(''));

export const phone = z.preprocess(
  (val: any) => val.split(' ').join(''),
  z
    .string()
    .trim()
    .regex(rePhone, 'Must be a valid phone number')
    .or(z.literal(''))
);

export const validateValues = (
  Schema: ZodSchema,
  values: z.infer<typeof Schema>,
  setErrors: Setter<{
    formErrors?: string[];
    fieldErrors?: { [x: string]: string[] };
  }>
) => {
  const res = Schema.safeParse(values);
  console.log('validateValues', values, res)
  if (res.success) {
    setErrors({});
    return res.data;
  } else {
    // Remember to flatten
    setErrors(res.error.flatten());
  }
};
