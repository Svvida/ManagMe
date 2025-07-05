import { Box, Button, CircularProgress, alpha } from "@mui/material";
import { IStoryFormData } from "../../../../../contract/stories";
import { useTypedFormContext } from "../../../../../hooks/useTypedFormContext";
import { useGetAllProjectsQuery } from "../../../../../redux/apiSlices/projects";

interface StoryFormActionsProps {
  isLoading: boolean;
  isEditMode: boolean;
  onCancel: () => void;
}

export function StoryFormActions({
  isLoading,
  isEditMode,
  onCancel,
}: StoryFormActionsProps) {
  const {
    formState: { isValid, isDirty },
  } = useTypedFormContext<IStoryFormData>();

  const { data: projects = [] } = useGetAllProjectsQuery();
  const projectsAvailable = projects.length > 0;

  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
      <Button
        onClick={onCancel}
        disabled={isLoading}
        sx={{ color: "text.secondary" }}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        variant="contained"
        disabled={!isValid || !isDirty || isLoading || !projectsAvailable}
        sx={{
          color: "white",
          background: "linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)",
          px: 3,
          py: 1,
          "&:hover": {
            background: "linear-gradient(135deg, #5e35a1 0%, #7048b8 100%)",
          },
          "&.Mui-disabled": {
            background: alpha("#9575cd", 0.5),
            color: alpha("#ffffff", 0.7),
          },
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : isEditMode ? (
          "Save Changes"
        ) : (
          "Create Story"
        )}
      </Button>
    </Box>
  );
}
