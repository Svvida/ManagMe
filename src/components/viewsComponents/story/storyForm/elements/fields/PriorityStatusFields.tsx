import { Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import { Priority, Status } from "../../../../../../contract/enums";
import { IStoryFormData } from "../../../../../../contract/stories"; // Or ITaskFormData, it's flexible
import { useTypedFormContext } from "../../../../../../hooks/useTypedFormContext";
import { themedFieldSx } from "../../styles/styles";

interface PriorityStatusFieldsProps {
  isLoading: boolean;
}

export function PriorityStatusFields({ isLoading }: PriorityStatusFieldsProps) {
  const { control, formState: { errors }, watch } = useTypedFormContext<IStoryFormData>();

  const ownerId = watch("ownerId");

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <FormControl fullWidth>
        <InputLabel>Priority *</InputLabel>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Priority *"
              error={!!errors.priority}
              disabled={isLoading}
              sx={themedFieldSx}
            >
              <MenuItem value={Priority.High}>🚨 High</MenuItem>
              <MenuItem value={Priority.Medium}>⚠️ Medium</MenuItem>
              <MenuItem value={Priority.Low}>💚 Low</MenuItem>
            </Select>
          )}
        />
        {errors.priority && <FormHelperText error>{errors.priority.message}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Status *</InputLabel>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Status *"
              error={!!errors.status}
              disabled={isLoading}
              sx={themedFieldSx}
            >
              <MenuItem value={Status.Todo}>📝 Todo</MenuItem>
              <MenuItem value={Status.Doing} disabled={!ownerId}>
                🔄 In Progress {ownerId ? '' : '(Assign first)'}
              </MenuItem>
              <MenuItem value={Status.Done}>✅ Done</MenuItem>
            </Select>
          )}
        />
        {errors.status && <FormHelperText error>{errors.status.message}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
