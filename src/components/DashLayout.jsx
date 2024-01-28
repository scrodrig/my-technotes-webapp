import DashFooter from 'src/components/DashFooter'
import DashHeader from 'src/components/DashHeader'
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
