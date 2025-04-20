import { Box, IconButton, Stack, Typography } from "@mui/material";
import { PlaylistAddCheck, Close } from "@mui/icons-material";

interface FormHeaderProps {
  isEditMode: boolean;
  editText: string;
  createText: string;
  onClose: () => void;
}

export function FormHeader({ isEditMode, editText, createText, onClose }: FormHeaderProps) {
  return (
    <Box sx={{
      p: 2,
      background: 'linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <PlaylistAddCheck sx={{ color: 'white' }} />
        <Typography variant="h6" component="h2" sx={{ color: 'white', fontWeight: 600 }}>
          {isEditMode ? editText : createText}
        </Typography>
      </Stack>
      <IconButton onClick={onClose} sx={{ color: 'white' }}>
        <Close />
      </IconButton>
    </Box>
  );
}
