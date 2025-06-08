import { ILoginResponse, ILoginRequest, IRegisterResponse, IRegisterRequest, IRefreshResponse } from "../../contract/auth";
import { Role } from "../../contract/enums";
import Api from "../api";
import {  setCredentials, logOut } from "../statesSlices/auth.slice";

export interface IDecodedJwt {
  accountId: number;
  role: Role;
  exp?: number;
  iat?: number;
}

const authApiSlice = Api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCredentials({
            accessToken: data.accessToken,
            user: data.user
          }));
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),

    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: newUser => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCredentials({
            accessToken: data.accessToken,
            user: data.user
          }));
        } catch (error) {
          console.error('Registration failed:', error);
        }
      },
    }),

    sendLogout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          dispatch(logOut());
          dispatch(Api.util.resetApiState());

        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),

    refresh: builder.mutation<IRefreshResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCredentials({
            accessToken: data.accessToken,
            user: data.user
          }));
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice;

export default authApiSlice;
