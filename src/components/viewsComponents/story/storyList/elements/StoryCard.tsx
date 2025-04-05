import { Card, CardContent, Typography, CardActions, IconButton, Tooltip, Chip, Stack, Avatar } from "@mui/material";
import { Edit, Delete, CalendarToday } from "@mui/icons-material";
import { Priority } from "../../../../../contract/enums";
import { IStory } from "../../../../../contract/stories";
import { formatDate } from "../../../../../utils/dateFormatter";

const priorityConfig = {
  [Priority.High]: { label: 'High', color: 'error' as const, icon: '🔴' },
  [Priority.Medium]: { label: 'Medium', color: 'warning' as const, icon: '🟡' },
  [Priority.Low]: { label: 'Low', color: 'success' as const, icon: '🟢' },
};

interface StoryCardProps {
  story: IStory;
  onEdit: (story: IStory) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function StoryCard({ story, onEdit, onDelete, isDeleting }: StoryCardProps) {
    const priority = priorityConfig[story.priority];

  return (
    <Card
      sx={{
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
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: '1rem', mb: 2 }}>
            {story.name}
          </Typography>
          {/* Display Owner Avatar and Tooltip */}
          <Tooltip title={story.owner ? `Owner: ${story.owner.firstName} ${story.owner.lastName}` : 'Owner not found'}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: story.owner ? 'secondary.main' : 'grey.400', fontSize: '0.875rem' }}>
              {story.owner ? `${story.owner.firstName[0]}${story.owner.lastName[0]}` : '?'}
            </Avatar>
          </Tooltip>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
               Created: {formatDate(story.createdAt)}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Priority Chip */}
          <Chip label={priority.label} color={priority.color} size="small" variant="outlined" />

          {/* Action buttons */}
          <CardActions sx={{ p: 0 }}>
            <Tooltip title="Edit story">
              <IconButton size="small" onClick={() => onEdit(story)} sx={{ color: '#673ab7' }}>
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete story">
              <IconButton size="small" onClick={() => onDelete(story.id)} disabled={isDeleting} color="error">
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
}
