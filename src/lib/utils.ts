import { z } from 'zod'
import { createSignal } from 'solid-js';

export const unWrapQueryData: any = (data: object[][]) => {
  let tmp: any = data;
  while (tmp.length === 1) tmp = tmp[0];
  return tmp;
};

/**
 * A no-operations wrapper used in JSX trick Solid to track whatever is passed into it.
 * @param func function to track
 * @returns undefined
 */
export const noop = (arg: any): any => undefined

export const createVoidSignal = createSignal<void>(undefined, {
  equals: false,
});

export const unpackResult = <T>(result: T[]): T => {
  // @ts-ignore
  return result.pop().pop()
}

export const logError = (error: Error) => {
  const key = [error.name, error.message]
    .filter(x => x)
    .join('::')
  console.warn(key, error)
}

export const awaitCondition = async (conditionCheck: Function, ms = 10) => {
  while (!conditionCheck()) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Get a types obhect with defaults or undefined from a zod-schema
 * See: https://github.com/colinhacks/zod/discussions/1953
 * @param schema
 * @returns
 */
export function zodSchemaDefaults<T extends z.ZodTypeAny>( schema: z.AnyZodObject | z.ZodEffects<any> ): z.infer<T> {
  // Check if it's a ZodEffect
  if (schema instanceof z.ZodEffects) {
      // Check if it's a recursive ZodEffect
      if (schema.innerType() instanceof z.ZodEffects) return getDefaults(schema.innerType())
      // return schema inner shape as a fresh zodObject
      return getDefaults(z.ZodObject.create(schema.innerType().shape))
  }

  function getDefaultValue(schema: z.ZodTypeAny): unknown {
      if (schema instanceof z.ZodDefault) return schema._def.defaultValue();
      // return an empty array if it is
      if (schema instanceof z.ZodArray) return [];
      // return an empty string if it is
      if (schema instanceof z.ZodString) return "";
      // return an content of object recursivly
      if (schema instanceof z.ZodObject) return getDefaults(schema);

      if (!("innerType" in schema._def)) return undefined;
      return getDefaultValue(schema._def.innerType);
}

  return Object.fromEntries(
      Object.entries( schema.shape ).map( ( [ key, value ] ) => {
          return [key, getDefaultValue(value)];
      } )
  )
}