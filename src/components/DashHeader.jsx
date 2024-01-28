import { Link } from 'react-router-dom'

const DashHeader = () => {
    const content = (
        <header className="dash-header">
            <div className="dash-header__container">
                <Link to="/dash">
                    {/* <Link to="/dash/nodes"> */}
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/*TODO: add nav buttons later */}
                </nav>
            </div>
        </header>
    )

    return content
}

export default DashHeader

