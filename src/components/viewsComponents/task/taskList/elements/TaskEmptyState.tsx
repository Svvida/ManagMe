import { Paper, Typography, alpha, Button } from "@mui/material";
import { PlaylistAdd } from "@mui/icons-material";

interface Props {
  onAdd: () => void;
}

export default function TaskEmptyState({ onAdd }: Props) {
  return (
    <Paper sx={{ textAlign: "center", py: 8, px: 4, mt: 4, background: `linear-gradient(135deg, ${alpha('#673ab7', 0.02)} 0%, ${alpha('#7e57c2', 0.02)} 100%)`, border: `1px solid ${alpha('#673ab7', 0.12)}`, borderRadius: 3 }}>
      <PlaylistAdd sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>No Tasks Found</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>No tasks match the current filters, or none have been created yet.</Typography>
      <Button variant="contained" onClick={onAdd} sx={{ background: 'linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)' }}>Create the First Task</Button>
    </Paper>
  );
}
