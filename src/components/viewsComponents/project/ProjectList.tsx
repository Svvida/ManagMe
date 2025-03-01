import {
  Container,
  Box,
  Alert,
  CircularProgress,
  Fade
} from "@mui/material";
import { useState } from "react";
import { IProject } from "../../../contract/projects";
import { useGetAllProjectsQuery, useDeleteProjectMutation } from "../../../redux/apiSlices/projects.api.slice";
import ProjectForm from "./ProjectForm";
import ProjectListHeader from "./elements/ProjectListHeader";
import ProjectCard from "./elements/ProjectCard";
import NoProjects from "./elements/NoProjects";

export default function ProjectList() {
  const { data: projects = [], isLoading, error, refetch } = useGetAllProjectsQuery();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editProject, setEditProject] = useState<IProject | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleAdd = () => {
    setEditProject(null);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id).unwrap();
      } catch {
        setDeleteError('Failed to delete project');
      }
    }
  };

  const handleEdit = (project: IProject) => {
    setEditProject(project);
    setOpenModal(true);
  };

  const handleSave = () => {
    setOpenModal(false);
    refetch();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditProject(null);
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
          <CircularProgress size={48} sx={{ color: '#673ab7' }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Alert severity="error" sx={{ mt: 4 }}>
          We encountered an error while fetching your projects. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <ProjectListHeader
          projectCount={projects.length}
          onAddProject={handleAdd}
        />

        {deleteError && (
          <Fade in>
            <Alert
              severity="error"
              onClose={() => setDeleteError(null)}
              sx={{ mb: 3, borderRadius: 2 }}
            >
              {deleteError}
            </Alert>
          </Fade>
        )}

        {projects.length === 0 ? (
          <NoProjects onAddProject={handleAdd} />
        ) : (
          <Fade in>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)'
                },
                gap: 3
              }}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isDeleting={isDeleting}
                />
              ))}
            </Box>
          </Fade>
        )}
      </Box>

      {openModal && (
        <ProjectForm
          open={openModal}
          onClose={handleCloseModal}
          project={editProject}
          onSave={handleSave}
        />
      )}
    </Container>
  );
}
