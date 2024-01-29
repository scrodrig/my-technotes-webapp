import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { selectUserById } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = ({ userId }) => {
    const user = useSelector((state) => selectUserById(state, userId))

    const navigate = useNavigate()

    if (!user) {
        return null
    }

    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const userRolesString = user.roles.toString().replace(',', ', ')

    const cellStatus = user.active ? '' : 'table__cell--inactive'

    return (
        <tr className="table__row user">
            <td className={`table__cell ${cellStatus}`}>{user.username}</td>
            <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
            <td className={`table__cell ${cellStatus}`}>
                <button
                    className="icon-button table__button"
                    onClick={handleEdit}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    userId: PropTypes.string.isRequired,
}

export default User
