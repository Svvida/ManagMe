import { Typography, Button, Box, Paper, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";

interface Props {
  selectedProjectName: string;
  onAdd: () => void;
  storyCount: number;
}

export default function StoryHeader({ selectedProjectName, onAdd }: Props) {
  return (
    <Paper sx={{ background: 'linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)', borderRadius: 3, p: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
            User Stories
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 400 }}>
            {selectedProjectName ? `Project: ${selectedProjectName}` : 'Select a project to begin'}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="contained" onClick={onAdd} startIcon={<Add />} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'white', fontWeight: 600, px: 3, py: 1.5, border: '1px solid rgba(255, 255, 255, 0.2)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' } }}>
            New Story
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
