import { TextField, Stack } from "@mui/material";
import { Controller } from "react-hook-form";
import { themedFieldSx } from "../../styles/styles";
import { ITaskFormData } from "../../../../../../contract/tasks";
import { useTypedFormContext } from "../../../../../../hooks/useTypedFormContext";

interface BasicInfoFieldsProps {
  isLoading: boolean;
}

export function BasicInfoFields({ isLoading }: BasicInfoFieldsProps) {
  const { control, formState: { errors } } = useTypedFormContext<ITaskFormData>();

  return (
    <Stack spacing={3}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            autoFocus
            fullWidth
            label="Task Name *"
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isLoading}
            sx={themedFieldSx}
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
            label="Description *"
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isLoading}
            sx={themedFieldSx}
          />
        )}
      />
    </Stack>
  );
}
