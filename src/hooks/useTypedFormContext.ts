import { useFormContext, FieldValues } from 'react-hook-form';

export const useTypedFormContext = <T extends FieldValues>() => {
  return useFormContext<T>();
};
