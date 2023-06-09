import { createApi } from "@reduxjs/toolkit/query/react";

import {BASE_URL, axiosBaseQuery} from "store/store/axiosBaseUrl";
import { IUser } from "types/users";

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['users'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: '/users',
        method: 'get',
      }),
      providesTags: ['users'],
    }),
    toggleFollow: builder.mutation<IUser, Pick<IUser, 'id'> & Partial<IUser>>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        data: patch,
      }),
      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedProduct } = await queryFulfilled
          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
              const foundedObject = draft?.find((item: IUser) => item.id === id)

              if (foundedObject !== undefined) {
                foundedObject.follow = updatedProduct.follow
                foundedObject.followers = updatedProduct.followers
              }
            }),
          )
        } catch (error) {
          console.log('catch error:', error)
        }
      },
    }),
  }),
})

export const { useGetUsersQuery, useToggleFollowMutation } = usersApi;