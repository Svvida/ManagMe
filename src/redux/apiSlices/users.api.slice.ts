import { Role } from "../../contract/enums";
import { IUser, ICreateUserRequest, IUpdateUserRequest } from "../../contract/users";
import Api from "../api";

export const userSlice = Api.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: '/users',
      }),
      providesTags: ['usersGet'],
    }),

    getAssignableUsers: builder.query<IUser[], void>({
      queryFn: async (_arg, _api, _extraOptions, baseQuery) => {
        const devOpsResult = await baseQuery({
          url: '/users',
          params: { role: Role.DevOps },
        });

        const developerResult = await baseQuery({
          url: '/users',
          params: { role: Role.Developer },
        });

        if (devOpsResult.error) return { error: devOpsResult.error };
        if (developerResult.error) return { error: developerResult.error };

        const combinedUsers = [
          ...(devOpsResult.data as IUser[]),
          ...(developerResult.data as IUser[])
        ];

        return { data: combinedUsers };
      },
      providesTags: ['usersGet'],
    }),

    getUserById: builder.query<IUser, string>({
      query: id => `/users/${id}`,
    }),

    createUser: builder.mutation<IUser, ICreateUserRequest>({
      query: user => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['usersGet'],
    }),

    updateUser: builder.mutation<IUser, IUpdateUserRequest>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['usersGet'],
    }),

    deleteUser: builder.mutation<{ id: string }, string>({
      query: id => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['usersGet'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAssignableUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userSlice;
