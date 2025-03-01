import { IProject, ICreateProjectRequest, IUpdateProjectRequest } from "../../contract/projects";
import Api from "../api";

export const projectSlice = Api.injectEndpoints({
  endpoints: builder => ({
    getAllProjects: builder.query<IProject[], void>({
      query: () => ({
        url: '/projects',
      }),
      providesTags: ['projectsGet'],
    }),

    getProjectById: builder.query<IProject, string>({
      query: id => `/projects/${id}`,
    }),

    createProject: builder.mutation<IProject, ICreateProjectRequest>({
      query: project => ({
        url: '/projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['projectsGet'],
    }),

    updateProject: builder.mutation<IProject, IUpdateProjectRequest>({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['projectsGet'],
    }),

    deleteProject: builder.mutation<{ id: string }, string>({
      query: id => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['projectsGet'],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectSlice;
