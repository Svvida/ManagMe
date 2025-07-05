import { FormControl, InputLabel, Select, MenuItem, FormHelperText, CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";
import { themedFieldSx } from "../../styles/styles";
import { IProject } from "../../../../../../contract/projects";
import { IStoryFormData } from "../../../../../../contract/stories";
import { useTypedFormContext } from "../../../../../../hooks/useTypedFormContext";
import { useGetAllProjectsQuery } from "../../../../../../redux/apiSlices/projects";

interface ProjectFieldProps {
  isLoading: boolean;
}

export function ProjectField({ isLoading }: ProjectFieldProps) {
  const { control, formState: { errors }, watch } = useTypedFormContext<IStoryFormData>();

  const { data: projects = [], isLoading: isLoadingProjects } = useGetAllProjectsQuery();

  const watchedProjectId = watch('projectId');
  const selectedProject = projects.find(p => p.id === watchedProjectId);

  if (isLoadingProjects) {
    return <CircularProgress />;
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Project *</InputLabel>
      <Controller
        name="projectId"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Project *"
            error={!!errors.projectId}
            disabled={isLoading}
            sx={themedFieldSx}
          >
            {projects.map((project: IProject) => (
              <MenuItem key={project.id} value={project.id}>
                📁 {project.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors.projectId && <FormHelperText error>{errors.projectId.message}</FormHelperText>}

      {selectedProject && (
        <FormHelperText>
          Project: {selectedProject.name}
          {selectedProject.description && ` - ${selectedProject.description}`}
        </FormHelperText>
      )}
    </FormControl>
  );
}
