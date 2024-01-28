import { Route, Routes } from 'react-router-dom'

import DashLayout from 'src/components/DashLayout'
import Layout from 'src/components/Layout'
import Login from 'src/features/auth/Login'
import NotesList from 'src/features/notes/NotesList'
import Public from 'src/components/Public'
import UsersList from 'src/features/users/UsersList'
import Welcome from 'src/features/auth/Welcome'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Public />} />
                <Route path="login" element={<Login />} />

                <Route path="dash" element={<DashLayout />}>
                    <Route index element={<Welcome />} />

                    <Route path="notes">
                        <Route index element={<NotesList />} />
                    </Route>

                    <Route path="users">
                        <Route index element={<UsersList />} />
                    </Route>
                </Route>
                {/* End Dash */}
            </Route>
        </Routes>
    )
}

export default App
