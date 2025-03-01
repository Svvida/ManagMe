import { yupResolver } from "@hookform/resolvers/yup";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  alpha,
  Fade,
  IconButton
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IProject } from "../../../contract/projects";
import { useCreateProjectMutation, useUpdateProjectMutation } from "../../../redux/apiSlices/projects.api.slice";
import { projectSchema } from "./schema/schema";
import { Add, Edit, Close } from "@mui/icons-material";

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  project?: IProject | null;
  onSave: () => void;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 0,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '90vh',
  overflow: 'hidden'
};

export default function ProjectForm({ open, onClose, project, onSave }: ProjectFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    reset,
  } = useForm<{ name: string; description: string }>({
    resolver: yupResolver(projectSchema),
    mode: 'onChange',
    defaultValues: { name: "", description: "" },
  });

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isLoading = isCreating || isUpdating;
  const isEditMode = !!project;

  useEffect(() => {
    if (project) {
      setValue("name", project.name);
      setValue("description", project.description || "");
    } else {
      reset({ name: "", description: "" });
    }
    setSubmitError(null);
  }, [project, open, setValue, reset]);

  const onSubmit = async (data: { name: string; description: string }) => {
    try {
      setSubmitError(null);
      if (isEditMode) {
        await updateProject({ id: project.id, data }).unwrap();
      } else {
        await createProject(data).unwrap();
      }
      onSave();
      handleClose(true);
    } catch (error: any) {
      setSubmitError(error?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} project.`);
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
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="project-form-title"
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          {/* Styled Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              {isEditMode ? <Edit sx={{ color: 'white' }} /> : <Add sx={{ color: 'white' }} />}
              <Typography id="project-form-title" variant="h6" component="h2" sx={{ color: 'white', fontWeight: 600 }}>
                {isEditMode ? 'Edit Project' : 'Create New Project'}
              </Typography>
            </Stack>
            <IconButton onClick={() => handleClose()} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ p: 3, overflowY: 'auto' }}
          >
            {submitError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {submitError}
              </Alert>
            )}

            <Stack spacing={3}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="Project Name *"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isLoading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': { borderColor: '#673ab7' },
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#673ab7' },
                    }}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Project Description"
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    disabled={isLoading}
                    placeholder="Describe your project..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': { borderColor: '#673ab7' },
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#673ab7' },
                    }}
                  />
                )}
              />
            </Stack>

            {/* Styled Actions */}
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
              <Button
                onClick={() => handleClose()}
                disabled={isLoading}
                sx={{ color: 'text.secondary' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid || !isDirty || isLoading}
                sx={{
                  color: 'white',
                  background: 'linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5e35a1 0%, #7048b8 100%)',
                  },
                  '&.Mui-disabled': {
                    background: alpha('#9575cd', 0.5),
                    color: alpha('#ffffff', 0.7)
                  }
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : (isEditMode ? 'Save Changes' : 'Create Project')}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
