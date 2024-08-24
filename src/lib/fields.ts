import { Setter } from 'solid-js';
import { z, ZodSchema } from 'zod';

const reName = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u);
const rePhone = new RegExp(/^([\+][1-9]{2})?[ ]?([0-9 ]{8})$/);
const reStreet = new RegExp(/^[\p{L}'][ \p{L}\p{N}'-,]{8,}$/u);

export const email = z.string().trim().email('Must be a valid email address');
export const name = z.string().trim().regex(reName, 'Must be a valid name');

export const pass = z
  .string()
  .trim()
  .min(3, 'Minimum 3 charcters')
  .or(z.literal(''));

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
  if (res.success) {
    setErrors({});
    return res.data;
  } else {
    // Remember to flatten!setErrors
    setErrors(res.error.flatten());
  }
};
