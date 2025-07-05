import { Box, Container } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { IStory } from "../../../../contract/stories";
import { useGetAllProjectsQuery } from "../../../../redux/apiSlices/projects";
import {
  useDeleteStoryMutation,
  useGetAllStoriesQuery,
} from "../../../../redux/apiSlices/stories";
import { selectUserId } from "../../../../redux/statesSlices/auth";
import StoryForm from "../storyForm/StoryForm";
import StoryEmptyState from "./elements/StoryEmptyState";
import StoryFilters from "./elements/StoryFilters";
import StoryHeader from "./elements/StoryHeader";
import StoryKanbanBoard from "./elements/StoryKanbanBoard";
import { Priority } from "../../../../contract/enums";

export default function StoryList() {
  const userId = useSelector(selectUserId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<IStory | null>(null);

  const [filters, setFilters] = useState({
    project: '',
    priority: 'all' as Priority | 'all',
  });

  const { data: projects = [] } = useGetAllProjectsQuery();
  const { data: stories = [], refetch } = useGetAllStoriesQuery();
  const [deleteStory, { isLoading: isDeleting }] = useDeleteStoryMutation();

  useEffect(() => {
    if (!filters.project && projects.length > 0) {
      setFilters(f => ({ ...f, project: projects[0].id }));
    }
  }, [projects, filters.project]);

  const filteredStories = useMemo(() => {
    if (!filters.project) return [];
    return stories.filter((story) => {
      const matchProject = story.project.id === filters.project;
      const matchPriority = filters.priority === 'all' || story.priority === filters.priority;

      return matchProject && matchPriority;
    });
  }, [stories, filters]);

  const handleOpenModal = (story: IStory | null = null) => {
    setEditingStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStory(null);
  };

  const handleSave = () => {
    refetch();
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      await deleteStory(id);
    }
  };

  const selectedProject = projects.find((p) => p.id === filters.project);

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1600px' }}>
      <Box sx={{ py: 4 }}>
        <StoryHeader
          selectedProjectName={selectedProject?.name || ""}
          storyCount={filteredStories.length}
          onAdd={() => handleOpenModal()}
        />

        {projects.length > 0 && (
          <StoryFilters
            projects={projects}
            selectedProject={filters.project}
            selectedPriority={filters.priority}
            onProjectChange={(value) => setFilters(f => ({ ...f, project: value }))}
            onPriorityChange={(value) => setFilters(f => ({ ...f, priority: value }))}
          />
        )}

        {filters.project && filteredStories.length > 0 ? (
          <StoryKanbanBoard
            stories={filteredStories}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        ) : (
          <Box sx={{ mt: 4 }}>
            <StoryEmptyState isProjectSelected={!!filters.project} />
          </Box>
        )}

        {isModalOpen && (
          <StoryForm
            open={isModalOpen}
            story={editingStory}
            onClose={handleCloseModal}
            onSave={handleSave}
            selectedProjectId={filters.project}
            currentUserId={userId!}
          />
        )}
      </Box>
    </Container>
  );
}
