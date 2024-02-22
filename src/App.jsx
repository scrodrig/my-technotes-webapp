import { Route, Routes } from 'react-router-dom'

import DashLayout from 'src/components/DashLayout'
import EditNote from 'src/features/notes/EditNote'
import EditUser from 'src/features/users/EditUser'
import Layout from 'src/components/Layout'
import Login from 'src/features/auth/Login'
import NewNote from 'src/features/notes/NewNote'
import NewUserForm from 'src/features/users/NewUserForm'
import NotesList from 'src/features/notes/NotesList'
import Prefetch from 'src/features/auth/Prefetch'
import Public from 'src/components/Public'
import UsersList from 'src/features/users/UsersList'
import Welcome from 'src/features/auth/Welcome'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Public />} />
                <Route path="login" element={<Login />} />

                <Route element={<Prefetch />}>
                    <Route path="dash" element={<DashLayout />}>
                        <Route index element={<Welcome />} />
                        <Route path="users">
                            <Route index element={<UsersList />} />
                            <Route path=":id" element={<EditUser />} />
                            <Route path="new" element={<NewUserForm />} />
                        </Route>

                        <Route path="notes">
                            <Route index element={<NotesList />} />
                            <Route path=":id" element={<EditNote />} />
                            <Route path="new" element={<NewNote />} />
                        </Route>
                    </Route>
                    {/* End Dash */}
                </Route>
            </Route>
        </Routes>
    )
}

export default App
