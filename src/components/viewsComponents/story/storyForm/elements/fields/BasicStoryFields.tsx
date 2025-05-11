import { Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IStoryFormData } from "../../../../../../contract/stories";
import { useTypedFormContext } from "../../../../../../hooks/useTypedFormContext";

interface BasicStoryFieldsProps {
  isLoading: boolean;
}

export function BasicStoryFields({ isLoading }: BasicStoryFieldsProps) {
  const { control, formState: { errors } } = useTypedFormContext<IStoryFormData>();

  return (
    <Stack spacing={3}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Story Name *"
            error={!!errors.name}
            helperText={errors.name?.message?.toString()}
            disabled={isLoading}
            autoFocus
            placeholder="As a user, I want to..."
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Story Description"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message?.toString()}
            disabled={isLoading}
            placeholder="Describe the user story in detail, including acceptance criteria..."
          />
        )}
      />
    </ Stack>
  );
}
