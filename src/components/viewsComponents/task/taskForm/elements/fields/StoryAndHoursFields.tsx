import { Stack, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { themedFieldSx } from "../../styles/styles";
import { useTypedFormContext } from "../../../../../../hooks/useTypedFormContext";
import { ITaskFormData } from "../../../../../../contract/tasks";
import { IStory } from "../../../../../../contract/stories";
import { useGetAllStoriesQuery } from "../../../../../../redux/apiSlices/stories.slices";

interface StoryAndHoursFieldsProps {
  isLoading: boolean;
}

export function StoryAndHoursFields({ isLoading }: StoryAndHoursFieldsProps) {
  const { control, formState: { errors } } = useTypedFormContext<ITaskFormData>();

  const { data: stories = [] } = useGetAllStoriesQuery();

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
      <Controller
        name="storyId"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.storyId}>
            <InputLabel id="story-select-label">Story *</InputLabel>
            <Select {...field} labelId="story-select-label" label="Story *" sx={themedFieldSx}>
              {stories.map((story: IStory) => (
                <MenuItem key={story.id} value={story.id}>
                  {story.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="estimatedHours"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type="number"
            label="Est. Hours"
            error={!!errors.estimatedHours}
            disabled={isLoading}
            sx={themedFieldSx}
            value={field.value || 0}
            onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}
          />
        )}
      />
    </Stack>
  );
}
