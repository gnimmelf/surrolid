import { Setter } from 'solid-js';
import { z, ZodSchema } from 'zod';

const reName = new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u);

export const email = z.string().email('Must be a valid email address');
export const name = z
  .string()
  .trim()
  .min(2, 'Minimum 2 charcters')
  .regex(reName, 'Must be a vaild name');

export const pass = z.string().trim().min(3, 'Minimum 3 charcters');

export const address = z.string().trim().min(3).or(z.literal(''));
export const phone = z
  .string()
  .trim()
  .min(8, 'Minimum 8 charcters')
  .or(z.literal(''));

export const validateValues = (
  Schema: ZodSchema,
  values: z.infer<typeof Schema>,
  setErrors: Setter<{
    formErrors: string[];
    fieldErrors: { [x: string]: string[] };
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
