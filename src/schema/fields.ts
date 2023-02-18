import { z } from 'zod';

export const email = z.string().email('Must be a valid email address');

export const pass = z
  .string()
  .min(3, 'Minimum 3 charcters, must contain both letters and numbers');

export const firstName = z.string().min(2);
export const lastName = z.string().min(2);
export const address = z.string().min(3).or(z.literal(''));
export const phone = z.string().min(8).or(z.literal(''));
