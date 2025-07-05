import { ITask, ICreateTaskRequest, IUpdateTaskRequest } from "../../contract/tasks";
import Api from "../api";

export const taskSlice = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<ITask[], void>({
      query: () => ({
        url: "/tasks",
      }),
      transformResponse: (response: ITask[]) => {
        return response.filter((task) => {
          return task.story && task.story.id;
        });
      },
      providesTags: ["tasksGet"],
    }),

    getTaskById: builder.query<ITask, string>({
      query: (id) => `/tasks/${id}`,
    }),

    createTask: builder.mutation<ITask, ICreateTaskRequest>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["tasksGet"],
    }),

    updateTask: builder.mutation<ITask, IUpdateTaskRequest>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["tasksGet"],
    }),

    completeTask: builder.mutation<ITask, string>({
      query: (id) => ({
        url: `/tasks/${id}/complete`,
        method: "PUT",
      }),
      invalidatesTags: ["tasksGet"],
    }),

    deleteTask: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasksGet"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} = taskSlice;
