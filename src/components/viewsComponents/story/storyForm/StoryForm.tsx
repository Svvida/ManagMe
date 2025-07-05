import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Box, Alert, Stack, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { IStory, IStoryFormData } from "../../../../contract/stories";
import {
  useCreateStoryMutation,
  useUpdateStoryMutation,
} from "../../../../redux/apiSlices/stories";
import { StoryFormActions } from "./elements/StoryFormActions";
import { StoryFormFields } from "./elements/StoryFormFields";
import { storySchema } from "./schema/schema";
import { modalStyle } from "./styles/styles";
import { Priority, Status } from "../../../../contract/enums";
import { FormHeader } from "../../../shared/formComponents/FormHeader";

interface StoryFormProps {
  open: boolean;
  onClose: () => void;
  story?: IStory | null;
  onSave: () => void;
  currentUserId: string;
  selectedProjectId?: string;
}

export default function StoryForm({ open, onClose, story, onSave, currentUserId, selectedProjectId }: StoryFormProps) {
  const methods = useForm<IStoryFormData>({
    resolver: yupResolver(storySchema),
    mode: 'onChange',
  });

  const { handleSubmit, formState: { isDirty }, reset } = methods;

  const [createStory, { isLoading: isCreating }] = useCreateStoryMutation();
  const [updateStory, { isLoading: isUpdating }] = useUpdateStoryMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isLoading = isCreating || isUpdating;
  const isEditMode = !!story;

  useEffect(() => {
    if (open) {
      const defaultValues = {
        name: story?.name || "",
        description: story?.description || "",
        priority: story?.priority || Priority.Medium,
        status: story?.status || Status.Todo,
        projectId: story?.project.id || selectedProjectId || "",
        ownerId: story?.owner.id || currentUserId,
      };
      reset(defaultValues);
      setSubmitError(null);
    }
  }, [open, story, currentUserId, selectedProjectId, reset]);

  const onSubmit = async (data: IStoryFormData) => {
    try {
      const payload = { ...data};
      if (isEditMode) {
        await updateStory({ id: story.id!, data: payload }).unwrap();
      } else {
        await createStory(payload).unwrap();
      }
      onSave();
      handleClose(true);
    } catch {
      setSubmitError(`Failed to ${isEditMode ? 'update' : 'create'} story.`);
    }
  };

  const handleClose = (forceClose = false) => {
    if (isDirty && !forceClose && !window.confirm("You have unsaved changes...?")) return;
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={() => handleClose()} closeAfterTransition>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <FormHeader
            isEditMode={isEditMode}
            editText="Edit Story"
            createText="Create New Story"
            onClose={() => handleClose()}
          />

          <FormProvider {...methods}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3, overflowY: 'auto' }}>
              {submitError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{submitError}</Alert>}

              <Stack spacing={3}>
                <StoryFormFields isLoading={isLoading} />

                <StoryFormActions
                  isLoading={isLoading}
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
