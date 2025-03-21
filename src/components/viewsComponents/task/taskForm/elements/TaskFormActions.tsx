import { Stack, Button, CircularProgress, alpha } from "@mui/material";

interface TaskFormActionsProps {
  isLoading: boolean;
  isValid: boolean;
  isDirty: boolean;
  isEditMode: boolean;
  onCancel: () => void;
}

export function TaskFormActions({
  isLoading,
  isValid,
  isDirty,
  isEditMode,
  onCancel
}: TaskFormActionsProps) {
  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 1 }}>
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
        disabled={!isValid || !isDirty || isLoading}
        sx={{
          color: 'white',
          background: 'linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)',
          px: 3,
          py: 1,
          '&:hover': {
            background: 'linear-gradient(135deg, #5e35a1 0%, #7048b8 100%)'
          },
          '&.Mui-disabled': {
            background: alpha('#9575cd', 0.5),
            color: alpha('#ffffff', 0.7)
          }
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          isEditMode ? 'Save Changes' : 'Create Task'
        )}
      </Button>
    </Stack>
  );
}
