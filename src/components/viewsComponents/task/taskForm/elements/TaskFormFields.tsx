import { BasicInfoFields } from "./fields/BasicInfoFields";
import { StoryAndHoursFields } from "./fields/StoryAndHoursFields";
import { PriorityAndStatusFields } from "./fields/PriorityAndStatusFields";
import { AssigneeField } from "./fields/AssigneeField";
import { useGetAssignableUsersQuery } from "../../../../../redux/apiSlices/users.api.slice";
import { Stack } from "@mui/material";

interface TaskFormFieldsProps {
  isLoading: boolean;
}

export function TaskFormFields({
  isLoading,
}: TaskFormFieldsProps) {

  const { data: assignableUsers = [] } = useGetAssignableUsersQuery();

  return (
    <Stack spacing={3}>
      <BasicInfoFields
        isLoading={isLoading}
      />

      <StoryAndHoursFields
        isLoading={isLoading}
      />

      <PriorityAndStatusFields/>

      <AssigneeField
        users={assignableUsers}
      />
    </ Stack>
  );
}
