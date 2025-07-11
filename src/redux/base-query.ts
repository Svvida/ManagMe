import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
import qs from 'qs';
import { setCredentials } from "./statesSlices/auth";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { IUser } from '../contract/users';

interface IAuthState {
  token: string | null;
  expDate: string | null;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:3000`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as { authSlice: IAuthState }).authSlice;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
  paramsSerializer: params =>
    qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false,
    }),
});

export const baseQueryWithReauth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.meta?.request.url.includes('auth/refresh') && result.error?.status === 403) {
    enqueueSnackbar(`You've reached limit of logged time, please login again!`, { variant: 'error' });
    return result;
  }

  if (result.error?.status !== 403) {
    return result;
  }

  const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

  if (refreshResult.data) {
    const data = refreshResult.data as { accessToken?: string, user?: IUser };

    if (data.accessToken) {
      api.dispatch(setCredentials({ accessToken: data.accessToken, user: data.user }));
      result = await baseQuery(args, api, extraOptions);

      return result;
    }
  }
  return refreshResult;
};
