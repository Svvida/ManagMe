import { Button, Box, Paper, Typography, alpha } from "@mui/material";
import { Add, FolderOpen } from "@mui/icons-material";

interface NoProjectsProps {
  onAddProject: () => void;
}

export default function NoProjects({ onAddProject }: NoProjectsProps) {
  return (
    <Paper
      sx={{
        textAlign: "center",
        py: 8,
        px: 4,
        background: `linear-gradient(135deg, ${alpha('#673ab7', 0.02)} 0%, ${alpha('#7e57c2', 0.02)} 100%)`,
        border: `1px solid ${alpha('#673ab7', 0.12)}`,
        borderRadius: 3
      }}
    >
      <Box sx={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${alpha('#673ab7', 0.1)} 0%, ${alpha('#7e57c2', 0.1)} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
        <FolderOpen sx={{ fontSize: 40, color: '#673ab7' }} />
      </Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        No Projects Yet
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
        Start building something amazing! Create your first project to get started.
      </Typography>
      <Button
        variant="contained"
        onClick={onAddProject}
        startIcon={<Add />}
        size="large"
        sx={{
          background: 'linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)',
          px: 4, py: 1.5, fontWeight: 600,
          '&:hover': { background: 'linear-gradient(135deg, #5e35a1 0%, #7048b8 100%)' }
        }}
      >
        Create Your First Project
      </Button>
    </Paper>
  );
}
