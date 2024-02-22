import EditNoteForm from './EditNoteForm'
import { selectAllUsers } from '../users/usersApiSlice'
import { selectNoteById } from './notesApiSlice'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditNote = () => {
    const { id } = useParams()

    const note = useSelector((state) => selectNoteById(state, id))
    const users = useSelector(selectAllUsers)

    const content =
        note && users ? <EditNoteForm note={note} users={users} /> : <p>Loading...</p>

    return content
}
export default EditNote
