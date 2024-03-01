import EditUserForm from './EditUserForm'
import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from 'src/features/users/usersApiSlice'
import { useParams } from 'react-router-dom'

const EditUser = () => {
    const { id } = useParams()

    const { user } = useGetUsersQuery('noteList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id],
        }),
    })

    if (!user) return <PulseLoader color={'#FFF'} />
    const content = <EditUserForm user={user} />

    return content
}

export default EditUser
