// src/components/viewsComponents/story/elements/StoryFormActions.tsx (Corrected)

import { Box, Button, CircularProgress, alpha } from "@mui/material";
import { IStoryFormData } from "../../../../../contract/stories";
import { useTypedFormContext } from "../../../../../hooks/useTypedFormContext";
import { useGetAllProjectsQuery } from "../../../../../redux/apiSlices/projects.slice";

// The props are now much simpler and cleaner!
interface StoryFormActionsProps {
  isLoading: boolean;
  isEditMode: boolean;
  onCancel: () => void;
}

export function StoryFormActions({
  isLoading,
  isEditMode,
  onCancel
}: StoryFormActionsProps) {
  // 1. Get the form's state directly from the context.
  //    We need `isValid` to enable/disable the button.
  //    We also get `isDirty` so the button is only enabled when changes have been made.
  const { formState: { isValid, isDirty } } = useTypedFormContext<IStoryFormData>();

  // You can also get project data here if it's only needed for this component.
  const { data: projects = [] } = useGetAllProjectsQuery();
  const projectsAvailable = projects.length > 0;

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
      {/* The Cancel button only needs the `onCancel` prop and the `isLoading` state. */}
      <Button
        onClick={onCancel}
        disabled={isLoading}
        sx={{ color: 'text.secondary' }}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        variant="contained"
        // 2. The disabled logic now uses the values from the context.
        //    The button is enabled only if the form is valid, has changes, is not loading, and projects exist.
        disabled={!isValid || !isDirty || isLoading || !projectsAvailable}
        sx={{
          color: 'white',
          background: 'linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)',
          px: 3,
          py: 1,
          '&:hover': {
            background: 'linear-gradient(135deg, #5e35a1 0%, #7048b8 100%)',
          },
          '&.Mui-disabled': {
            background: alpha('#9575cd', 0.5),
            color: alpha('#ffffff', 0.7)
          }
        }}
      >
        {isLoading
          ? <CircularProgress size={24} color="inherit" />
          : (isEditMode ? 'Save Changes' : 'Create Story')
        }
      </Button>
    </Box>
  );
}
