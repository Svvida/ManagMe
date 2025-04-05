import { Paper, Typography, alpha } from "@mui/material";
import { Search, StickyNote2Outlined } from "@mui/icons-material";

interface Props {
  isProjectSelected: boolean;
}

const EmptyStatePaper = ({ children }: { children: React.ReactNode }) => (
  <Paper sx={{ textAlign: "center", py: 8, px: 4, background: `linear-gradient(135deg, ${alpha('#673ab7', 0.02)} 0%, ${alpha('#7e57c2', 0.02)} 100%)`, border: `1px solid ${alpha('#673ab7', 0.12)}`, borderRadius: 3 }}>
    {children}
  </Paper>
);

export default function StoryEmptyState({ isProjectSelected }: Props) {
  if (!isProjectSelected) {
    return (
      <EmptyStatePaper>
        <Search sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Select a Project</Typography>
        <Typography color="text.secondary">Use the filter above to choose a project and view its stories.</Typography>
      </EmptyStatePaper>
    );
  }

  return (
    <EmptyStatePaper>
      <StickyNote2Outlined sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>No Stories Yet</Typography>
      <Typography color="text.secondary">This project is empty. Click "New Story" to add the first one!</Typography>
    </EmptyStatePaper>
  );
}
