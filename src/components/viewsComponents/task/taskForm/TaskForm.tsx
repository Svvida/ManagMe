import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Box, Alert, Fade, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Priority, Status } from "../../../../contract/enums";
import { ITask, ITaskFormData } from "../../../../contract/tasks";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../../../redux/apiSlices/tasks.slice";
import { TaskFormActions } from "./elements/TaskFormActions";
import { taskSchema } from "./schema/schema";
import { modalStyle } from "./styles/styles";
import { TaskFormFields } from "./elements/TaskFormFields";
import { FormHeader } from "../../../shared/formComponents/FormHeader";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  task?: ITask | null;
  onSave: () => void;
}

export default function TaskForm({ open, onClose, task, onSave }: TaskFormProps) {
  const form = useForm<ITaskFormData>({
    resolver: yupResolver(taskSchema),
    mode: 'onChange',
  });

  const { handleSubmit, formState: { isDirty, isValid }, reset, setValue, watch } = form;

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isLoading = isCreating || isUpdating;
  const isEditMode = !!task;
  const assignedUserId = watch("assignedUserId");
  const status = watch("status");

  useEffect(() => {
    if (open) {
      const defaultValues = {
        name: task?.name || "",
        description: task?.description || "",
        priority: task?.priority || Priority.Medium,
        storyId: task?.story.id || "",
        estimatedHours: task?.estimatedHours || 0,
        assignedUserId: task?.assignedUser?.id || "",
        status: task?.status || Status.Todo,
      };
      reset(defaultValues);
      setSubmitError(null);
    }
  }, [open, task, reset]);

  useEffect(() => {
    if (!assignedUserId && status === Status.Doing) {
      setValue("status", Status.Todo);
    }
  }, [assignedUserId, status, setValue]);

  // Handlers
  const onSubmit = async (data: ITaskFormData) => {
    try {
      const payload = {
        ...data,
        startDate: data.status === Status.Doing ? (task?.startDate || new Date().toISOString()) : task?.startDate,
        endDate: data.status === Status.Done ? new Date().toISOString() : undefined,
      };

      if (isEditMode) {
        await updateTask({ id: task.id!, data: payload }).unwrap();
      } else {
        await createTask(payload).unwrap();
      }

      onSave();
      handleClose(true);
    } catch {
      setSubmitError(`Failed to save task.`);
    }
  };

  const handleClose = (forceClose = false) => {
    if (isDirty && !forceClose && !window.confirm("You have unsaved changes. Are you sure you want to close?")) {
      return;
    }
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={() => handleClose()} closeAfterTransition>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <FormHeader
            isEditMode={isEditMode}
            editText="Edit Task"
            createText="Create New Task"
            onClose={() => handleClose()}
          />

        <FormProvider {...form}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3, overflowY: 'auto' }}>
            {submitError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {submitError}
              </Alert>
            )}

            <Stack spacing={3}>
              <TaskFormFields
                isLoading={isLoading}
              />

              <TaskFormActions
                isLoading={isLoading}
                isDirty={isDirty}
                isValid={isValid}
                isEditMode={isEditMode}
                onCancel={() => handleClose()}
              />
            </Stack>
          </Box>
          </FormProvider>
        </Box>
      </Fade>
    </Modal>
  );
}
