import { FormControl, InputLabel, Select, MenuItem, Paper, Typography } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { Priority } from "../../../../../contract/enums";
import { IProject } from "../../../../../contract/projects";

interface Props {
  projects: IProject[];
  selectedProject: string;
  selectedPriority: Priority | "all";
  onProjectChange: (value: string) => void;
  onPriorityChange: (value: Priority | "all") => void;
}

export default function StoryFilters({
  projects,
  selectedProject,
  selectedPriority,
  onProjectChange,
  onPriorityChange
}: Props) {
  return (
    <Paper sx={{ p: 2, display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap', borderRadius: 3 }}>
      <FilterList color="action" />
      <Typography variant="body1" sx={{ fontWeight: 500, mr: 1 }}>Filter by:</Typography>

      {/* Project Filter */}
      <FormControl sx={{ minWidth: 240 }} size="small">
        <InputLabel id="project-filter-label">Project</InputLabel>
        <Select
          labelId="project-filter-label"
          value={selectedProject}
          onChange={(e) => onProjectChange(e.target.value)}
          label="Project"
        >
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Priority Filter */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Priority</InputLabel>
        <Select value={selectedPriority} label="Priority" onChange={(e) => onPriorityChange(e.target.value as Priority | "all")}>
          <MenuItem value="all"><em>All Priorities</em></MenuItem>
          <MenuItem value={Priority.High}>High</MenuItem>
          <MenuItem value={Priority.Medium}>Medium</MenuItem>
          <MenuItem value={Priority.Low}>Low</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
}
