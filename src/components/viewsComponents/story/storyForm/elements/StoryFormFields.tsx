import { Stack } from "@mui/material";
import { BasicStoryFields } from "./fields/BasicStoryFields";
import { PriorityStatusFields } from "./fields/PriorityStatusFields";
import { ProjectField } from "./fields/ProjectField";
import { OwnerField } from "./fields/OwnerField";
import { useGetAllUsersQuery } from "../../../../../redux/apiSlices/users";

interface StoryFormFieldsProps {
  isLoading: boolean;
}

export function StoryFormFields({
  isLoading
}: StoryFormFieldsProps) {
  const {data: users = []} = useGetAllUsersQuery();

  return (
    <Stack spacing={3}>
      <BasicStoryFields
        isLoading={isLoading}
      />

      <PriorityStatusFields
        isLoading={isLoading}
      />

      <OwnerField
        users={users}
      />

      <ProjectField
        isLoading={isLoading}
      />
    </Stack>
  );
}
