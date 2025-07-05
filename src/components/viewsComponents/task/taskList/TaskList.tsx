import { useState } from "react";
import { Container, CircularProgress, Box } from "@mui/material";
import TaskHeader from "./elements/TaskHeader";
import TaskFilters from "./elements/TaskFilters";
import TaskKanbanBoard from "./elements/TaskKanbanBoard";
import TaskEmptyState from "./elements/TaskEmptyState";
import { Priority } from "../../../../contract/enums";
import { ITask } from "../../../../contract/tasks";
import { useGetAllStoriesQuery } from "../../../../redux/apiSlices/stories";
import {
  useGetAllTasksQuery,
  useDeleteTaskMutation,
} from "../../../../redux/apiSlices/tasks";
import { useGetAssignableUsersQuery } from "../../../../redux/apiSlices/users";
import TaskForm from "../taskForm/TaskForm";

export default function TaskList() {
  const { data: tasks = [], isLoading: loadingTasks, refetch } = useGetAllTasksQuery();
  const { data: users = [], isLoading: loadingUsers } = useGetAssignableUsersQuery();
  const { data: stories = [], isLoading: loadingStories } = useGetAllStoriesQuery();

  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const [filters, setFilters] = useState({
    user: "all",
    priority: "all",
    story: "all",
  });

  const handleOpenModal = (task: ITask | null = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSave = () => {
    refetch();
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.user === "all" || task?.assignedUser?.id === filters.user) &&
      (filters.priority === "all" || task.priority === filters.priority) &&
      (filters.story === "all" || task.story?.id === filters.story)
    );
  });

  const isLoading = loadingTasks || loadingUsers || loadingStories;

  if (isLoading) {
    return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: '80vh' }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1600px' }}>
      <Box sx={{ py: 4 }}>
        <TaskHeader onAdd={() => handleOpenModal()} taskCount={filteredTasks.length} />
        <TaskFilters
          users={users}
          stories={stories}
          selectedUser={filters.user}
          selectedPriority={filters.priority as Priority | "all"}
          selectedStory={filters.story}
          onUserChange={(value) => setFilters(f => ({ ...f, user: value }))}
          onPriorityChange={(value) => setFilters(f => ({ ...f, priority: value }))}
          onStoryChange={(value) => setFilters(f => ({ ...f, story: value }))}/>
        {filteredTasks.length === 0 ? (
          <TaskEmptyState onAdd={() => handleOpenModal()} />
        ) : (
          <TaskKanbanBoard
            tasks={filteredTasks}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}
        {isModalOpen && (
          <TaskForm
            open={isModalOpen}
            onClose={handleCloseModal}
            task={editingTask}
            onSave={handleSave}
          />
        )}
      </Box>
    </Container>
  );
}
