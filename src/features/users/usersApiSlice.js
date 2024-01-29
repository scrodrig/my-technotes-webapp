import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { apiSlice } from '../../app/api/apiSlice'

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStaus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map((user) => {
                    user.id = user._id
                    return user
                })
                return userAdapter.setAll(initialState, loadedUsers)
            },
            // eslint-disable-next-line no-unused-vars
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'User', id })),
                    ]
                } else {
                    return [{ type: 'User', id: 'LIST' }]
                }
            },
        }),
    }),
})

export const { useGetUsersQuery } = usersApiSlice

//* returns the query result object

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

//* creates memoized selector that returns the result object
const selectUsersData = createSelector(
    selectUsersResult,
    (usersResult) => usersResult.data, //? normalized state object with ids and entities
)

//* getSelectors creates these selexctors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    //! Pass in a selector tht return the users slice of state
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
