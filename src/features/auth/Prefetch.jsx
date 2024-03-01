import { Outlet } from 'react-router-dom'
import { notesApiSlice } from '../notes/notesApiSlice'
import { store } from '../../app/store'
import { useEffect } from 'react'
import { usersApiSlice } from '../users/usersApiSlice'

const Prefetch = () => {
    useEffect(() => {
        store.dispatch(
            notesApiSlice.util.prefetch('getNotes', 'notesList', {
                force: true,
            })
        )
        store.dispatch(
            usersApiSlice.util.prefetch('getUsers', 'usersList', {
                force: true,
            })
        )
    }, [])

    return <Outlet />
}
export default Prefetch
