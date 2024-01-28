import { useLocation, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const DashFooter = () => {
    const navigate = useNavigate()
    const { pathName } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')
    let goHomeButton = null

    if (pathName !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
        <footer className="dash-footer">
            {{ goHomeButton }}
            <p>Current User:</p>
            <p>Status:</p>
        </footer>
    )

    return content
}

export default DashFooter
