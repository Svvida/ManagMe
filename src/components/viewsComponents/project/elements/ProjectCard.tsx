import {
  IconButton,
  Tooltip,
  Box,
  Typography,
  alpha,
  Card,
  CardContent,
  CardActions,
  Chip,
  Zoom
} from "@mui/material";
import { Edit, Delete, FolderOpen } from "@mui/icons-material";
import { IProject } from "../../../../contract/projects";

interface ProjectCardProps {
  project: IProject;
  onEdit: (project: IProject) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function ProjectCard({ project, onEdit, onDelete, isDeleting }: ProjectCardProps) {
  return (
    <Zoom in timeout={300}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: `linear-gradient(135deg, ${alpha("#673ab7", 0.02)} 0%, ${alpha("#7e57c2", 0.02)} 100%)`,
          border: `1px solid ${alpha("#673ab7", 0.12)}`,
          borderRadius: 3,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 8px 25px ${alpha("#673ab7", 0.15)}`,
            border: `1px solid ${alpha("#673ab7", 0.25)}`,
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: "linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
                flexShrink: 0,
              }}
            >
              <FolderOpen sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  mb: 0.5,
                  wordBreak: "break-word",
                }}
              >
                {project.name}
              </Typography>
              <Tooltip title={project.id}>
                <Chip
                  label={project.id.substring(0, 8)}
                  size="small"
                  sx={{
                    backgroundColor: alpha("#673ab7", 0.1),
                    color: "#673ab7",
                    fontSize: "0.75rem",
                    height: 20,
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.5,
              minHeight: "4.5em",
            }}
          >
            {project.description || "No description provided"}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
          <Tooltip title="Edit project">
            <IconButton
              onClick={() => onEdit(project)}
              sx={{
                color: "#673ab7",
                "&:hover": { backgroundColor: alpha("#673ab7", 0.1) },
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete project">
            <IconButton
              onClick={() => onDelete(project.id)}
              disabled={isDeleting}
              sx={{
                color: "error.main",
                "&:hover": { backgroundColor: alpha("#f44336", 0.1) },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Zoom>
  );
}
