import { Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import { Priority, Status } from "../../../../../../contract/enums";
import { ITaskFormData } from "../../../../../../contract/tasks";
import { useTypedFormContext } from "../../../../../../hooks/useTypedFormContext";
import { themedFieldSx } from "../../styles/styles";

export function PriorityAndStatusFields() {
  const { control, formState: { errors }, watch } = useTypedFormContext<ITaskFormData>();

  const assignedUserId = watch("assignedUserId");

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.priority}>
            <InputLabel id="priority-label">Priority *</InputLabel>
            <Select {...field} labelId="priority-label" label="Priority *" sx={themedFieldSx}>
              <MenuItem value={Priority.High}>🚨 High</MenuItem>
              <MenuItem value={Priority.Medium}>⚠️ Medium</MenuItem>
              <MenuItem value={Priority.Low}>💚 Low</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.status}>
            <InputLabel id="status-label">Status *</InputLabel>
            <Select {...field} labelId="status-label" label="Status *" sx={themedFieldSx}>
              <MenuItem value={Status.Todo}>📝 Todo</MenuItem>
              <MenuItem value={Status.Doing} disabled={!assignedUserId}>
                🔄 In Progress {assignedUserId ? '' : '(Assign first)'}
              </MenuItem>
              <MenuItem value={Status.Done}>✅ Done</MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </Stack>
  );
}
