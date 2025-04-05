import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import { themedFieldSx } from "../../styles/styles";
import { IUser } from "../../../../../../contract/users";
import { ITaskFormData } from "../../../../../../contract/tasks";
import { useTypedFormContext } from "../../../../../../hooks/useTypedFormContext";

interface AssigneeFieldProps {
  users: IUser[];
}

export function AssigneeField({ users }: AssigneeFieldProps) {
  const { control, formState: { errors } } = useTypedFormContext<ITaskFormData>();

  return (
    <Controller
      name="assignedUserId"
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!errors.assignedUserId}>
          <InputLabel id="user-label">Assignee</InputLabel>
          <Select
            {...field}
            labelId="user-label"
            label="Assignee"
            sx={themedFieldSx}
            value={field.value || ""}
          >
            <MenuItem value=""><em>👤 Unassigned</em></MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                👨‍💻 {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
