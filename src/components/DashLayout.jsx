import DashFooter from './DashFooter'
import DashHeader from './DashHeader'
import { Outlet } from 'react-router-dom'

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <div className="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}

export default DashLayout
