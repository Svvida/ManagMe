import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import { themedFieldSx } from "../../styles/styles";
import { IUser } from "../../../../../../contract/users";
import { useTypedFormContext } from "../../../../../../hooks/useTypedFormContext";
import { IStoryFormData } from "../../../../../../contract/stories";

interface OwnerFieldProps {
  users: IUser[];
}

export function OwnerField({ users }: OwnerFieldProps) {
  const { control, formState: { errors } } = useTypedFormContext<IStoryFormData>();

  return (
    <Controller
      name="ownerId"
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!errors.ownerId}>
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
