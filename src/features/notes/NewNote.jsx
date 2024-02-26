import NewNoteForm from './NewNoteForm'
import { selectAllUsers } from '../users/usersApiSlice'
import { useSelector } from 'react-redux'

const NewNote = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewNoteForm users={users} />

    return content
}
export default NewNote
