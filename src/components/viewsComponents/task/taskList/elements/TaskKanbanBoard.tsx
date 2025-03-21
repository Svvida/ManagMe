import { Box, Paper, Typography, alpha } from "@mui/material";
import TaskCard from "./TaskCard";
import { Status } from "../../../../../contract/enums";
import { ITask } from "../../../../../contract/tasks";

const columns: { title: string; status: Status; color: string }[] = [
  { title: "Todo", status: Status.Todo, color: '#42a5f5' },
  { title: "In Progress", status: Status.Doing, color: '#ff9800' },
  { title: "Done", status: Status.Done, color: '#4caf50' },
];

interface TaskKanbanBoardProps {
  tasks: ITask[];
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function TaskKanbanBoard({ tasks, onEdit, onDelete, isDeleting }: TaskKanbanBoardProps) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, py: 2 }}>
      {columns.map((column) => {
        const tasksInColumn = tasks.filter((task) => task.status === column.status);
        return (
          <Box key={column.status}>
            <Paper sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, border: '1px solid', borderBottom: 'none', borderColor: alpha(column.color, 0.5), background: `linear-gradient(to right, ${alpha(column.color, 0.1)}, ${alpha(column.color, 0.02)})` }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: column.color }}>{column.title}</Typography>
              <Typography sx={{ fontWeight: 700, color: 'white', background: column.color, borderRadius: '12px', px: 1.5, minWidth: '24px', textAlign: 'center' }}>
                {tasksInColumn.length}
              </Typography>
            </Paper>
            <Box sx={{ p: 2, height: { xs: 'auto', md: 'calc(100vh - 380px)' }, minHeight: 200, overflowY: 'auto', border: '1px solid', borderColor: alpha(column.color, 0.5), borderTop: 'none', borderRadius: '0 0 8px 8px', bgcolor: 'background.paper' }}>
              {tasksInColumn.length > 0 ? (
                tasksInColumn.map((task) => ( <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} isDeleting={isDeleting} /> ))
              ) : (
                <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary', fontStyle: 'italic' }}>No tasks here.</Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
