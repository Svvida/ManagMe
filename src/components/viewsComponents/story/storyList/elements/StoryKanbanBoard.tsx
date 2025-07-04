import { Box, Paper, Typography, alpha } from "@mui/material";
import { Status } from "../../../../../contract/enums";
import { IStory } from "../../../../../contract/stories";
import StoryCard from "./StoryCard";

const columns: { title: string; status: Status; color: string }[] = [
  { title: "Todo", status: Status.Todo, color: '#42a5f5' },
  { title: "In Progress", status: Status.Doing, color: '#ff9800' },
  { title: "Done", status: Status.Done, color: '#4caf50' },
];

interface StoryKanbanBoardProps {
  stories: IStory[];
  onEdit: (story: IStory) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function StoryKanbanBoard({ stories, onEdit, onDelete, isDeleting }: StoryKanbanBoardProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 3,
        py: 2
      }}
    >
      {columns.map((column) => {
        const storiesInColumn = stories.filter((story) => story.status === column.status);
        return (
          <Box key={column.status}>
            <Paper
              sx={{
                p: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                border: "1px solid",
                borderBottom: "none",
                borderColor: alpha(column.color, 0.5),
                background: `linear-gradient(to right, ${alpha(column.color, 0.1)}, ${alpha(column.color, 0.02)})`,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: column.color }}
              >
                {column.title}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "white",
                  background: column.color,
                  borderRadius: "12px",
                  px: 1.5,
                  minWidth: "24px",
                  textAlign: "center",
                }}
              >
                {storiesInColumn.length}
              </Typography>
            </Paper>
            <Box
              sx={{
                p: 2,
                height: { xs: "auto", md: "calc(100vh - 350px)" },
                minHeight: 200,
                overflowY: "auto",
                border: "1px solid",
                borderColor: alpha(column.color, 0.5),
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                bgcolor: "background.paper",
              }}
            >
              {storiesInColumn.length > 0 ? (
                storiesInColumn.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isDeleting={isDeleting}
                  />
                ))
              ) : (
                <Box
                  sx={{
                    p: 2,
                    textAlign: "center",
                    color: "text.secondary",
                    fontStyle: "italic",
                  }}
                >
                  No stories here.
                </Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
