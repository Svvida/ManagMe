import { FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { IStory } from "../../../../../contract/stories";
import { Priority } from "../../../../../contract/enums";
import { IUser } from "../../../../../contract/users";

interface TaskFiltersProps {
  users: IUser[];
  stories: IStory[];
  selectedUser: string | "all";
  selectedPriority: Priority | "all";
  selectedStory: string | "all";
  onUserChange: (value: string | "all") => void;
  onPriorityChange: (value: Priority | "all") => void;
  onStoryChange: (value: string | "all") => void;
}

export default function TaskFilters({ users, stories, selectedUser, selectedPriority, selectedStory, onUserChange, onPriorityChange, onStoryChange }: TaskFiltersProps) {
  return (
    <Paper sx={{ p: 2, display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap', borderRadius: 3 }}>
      <FilterList color="action" />
      <Typography variant="body1" sx={{ fontWeight: 500, mr: 1 }}>Filters:</Typography>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Story</InputLabel>
        <Select value={selectedStory} label="Story" onChange={(e) => onStoryChange(e.target.value)}>
          <MenuItem value="all"><em>All Stories</em></MenuItem>
          {stories.map((s) => (<MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Assignee</InputLabel>
        <Select value={selectedUser} label="Assignee" onChange={(e) => onUserChange(e.target.value)}>
          <MenuItem value="all"><em>All Users</em></MenuItem>
          {users.map((u) => (<MenuItem key={u.id} value={u.id}>{u.firstName} {u.lastName}</MenuItem>))}
        </Select>
      </FormControl>
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
