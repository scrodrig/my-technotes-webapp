import NewNoteForm from './NewNoteForm'
import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from 'src/features/users/usersApiSlice'

const NewNote = () => {
    const { users } = useGetUsersQuery('noteList', {
        selectFromResult: ({ data }) => ({
            user: data?.ids.map((id) => data?.entities[id]),
        }),
    })

    if (!users?.length) return <PulseLoader color={'#FFF'} />

    const content = <NewNoteForm users={users} />

    return content
}
export default NewNote
