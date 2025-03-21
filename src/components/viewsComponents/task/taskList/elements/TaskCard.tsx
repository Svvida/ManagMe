import { Card, Box, Typography, Tooltip, IconButton, Chip, Avatar, Stack, Menu, MenuItem, alpha } from "@mui/material";
import { Edit, Delete, MoreVert, AccessTime, FolderOpenOutlined, CalendarToday, PlayArrow, CheckCircle } from "@mui/icons-material";
import { useState } from "react";
import { ITask } from "../../../../../contract/tasks";
import { Priority, Status } from "../../../../../contract/enums";
import { formatDate } from "../../../../../utils/dateFormatter";

const priorityConfig = {
  [Priority.High]: { label: 'High', color: 'error' as const },
  [Priority.Medium]: { label: 'Medium', color: 'warning' as const },
  [Priority.Low]: { label: 'Low', color: 'success' as const },
};

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function TaskCard({ task, onEdit, onDelete, isDeleting }: TaskCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    onEdit(task);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(task.id!);
    handleMenuClose();
  };

  const assignee = task.assignedUser;
  const priority = priorityConfig[task.priority];

  return (
    <Card sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderColor: 'primary.main',
          transform: 'translateY(-2px)',
        },
      }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: '1rem', mb: 1, pr: 1 }}>{task.name}</Typography>
          <IconButton size="small" onClick={handleMenuClick} sx={{ mt: -0.5, mr: -1 }}><MoreVert /></IconButton>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <FolderOpenOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" noWrap>Story: {task.story?.name || 'N/A'}</Typography>
        </Stack>

        <Stack spacing={1} sx={{ mb: 2 }}>
          {/* Always show createdAt */}
          {task.createdAt && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Created: {formatDate(task.createdAt)}
              </Typography>
            </Stack>
          )}

          {/* Show startDate when status is doing or done */}
          {(task.status === Status.Doing || task.status === Status.Done) && task.startDate && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <PlayArrow sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Started: {formatDate(task.startDate)}
              </Typography>
            </Stack>
          )}

          {/* Show endDate when status is done */}
          {task.status === Status.Done && task.endDate && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <CheckCircle sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Completed: {formatDate(task.endDate)}
              </Typography>
            </Stack>
          )}
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={priority.label} color={priority.color} size="small" variant="outlined" sx={{ fontWeight: 500 }} />
            <Tooltip title="Estimated Hours">
              <Chip icon={<AccessTime />} label={task.estimatedHours} size="small" sx={{ bgcolor: alpha('#000', 0.05) }} />
            </Tooltip>
          </Stack>
          <Tooltip title={assignee ? `${assignee.firstName} ${assignee.lastName}` : 'Unassigned'}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: assignee ? 'primary.main' : 'grey.400', fontSize: '0.875rem' }}>
              {assignee ? `${assignee.firstName[0]}${assignee.lastName[0]}` : '?'}
            </Avatar>
          </Tooltip>
        </Stack>
      </Box>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}><Edit sx={{ mr: 1 }} fontSize="small" /> Edit</MenuItem>
        <MenuItem onClick={handleDelete} disabled={isDeleting} sx={{ color: 'error.main' }}><Delete sx={{ mr: 1 }} fontSize="small" /> Delete</MenuItem>
      </Menu>
    </Card>
  );
}
