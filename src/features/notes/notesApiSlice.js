import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { apiSlice } from '../../app/api/apiSlice'

const noteAdapter = createEntityAdapter({
    sortComparer: (a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1,
})

const initialState = noteAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => ({
                url: '/notes',
                validateStaus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (responseData) => {
                const loadedNotes = responseData.map((note) => {
                    note.id = note._id
                    return note
                })
                return noteAdapter.setAll(initialState, loadedNotes)
            },
            // eslint-disable-next-line no-unused-vars
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Note', id })),
                    ]
                } else {
                    return [{ type: 'Note', id: 'LIST' }]
                }
            },
        }),
        addNewNote: builder.mutation({
            query: (initialNote) => ({
                url: '/notes',
                method: 'POST',
                body: {
                    ...initialNote,
                },
            }),
            invalidatesTags: [{ type: 'Note', id: 'LIST' }],
        }),
        updateNote: builder.mutation({
            query: (initialNote) => ({
                url: '/notes',
                method: 'PATCH',
                body: {
                    ...initialNote,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id },
            ],
        }),
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: `/notes`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id },
            ],
        }),
    }),
})

export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = notesApiSlice

//* returns the query result object

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

//* creates memoized selector that returns the result object
const selectNotesData = createSelector(
    selectNotesResult,
    (notesResult) => notesResult.data //? normalized state object with ids and entities
)

//* getSelectors creates these selexctors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds,
    //! Pass in a selector tht return the notes slice of state
} = noteAdapter.getSelectors((state) => selectNotesData(state) ?? initialState)
