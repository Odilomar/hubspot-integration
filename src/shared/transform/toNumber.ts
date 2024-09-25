import { TransformFnParams } from 'class-transformer';

export const transformToNumber = ({ value }: TransformFnParams) => {
  if (!value) return null;

  return Number(value);
};
