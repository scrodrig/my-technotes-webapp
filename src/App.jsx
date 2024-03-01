import { Route, Routes } from 'react-router-dom'

import DashLayout from 'src/components/DashLayout'
import EditNote from 'src/features/notes/EditNote'
import EditUser from 'src/features/users/EditUser'
import Layout from 'src/components/Layout'
import Login from 'src/features/auth/Login'
import NewNote from 'src/features/notes/NewNote'
import NewUserForm from 'src/features/users/NewUserForm'
import NotesList from 'src/features/notes/NotesList'
import PersistLogin from 'src/features/auth/PersistLogin'
import Prefetch from 'src/features/auth/Prefetch'
import Public from 'src/components/Public'
import { ROLES } from 'src/config/roles'
import RequireAuth from 'src/features/auth/RequireAuth'
import UsersList from 'src/features/users/UsersList'
import Welcome from 'src/features/auth/Welcome'
import useTitle from 'src/hooks/useTitle'

function App() {
    useTitle('My notes repairs')
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public routes */}
                <Route index element={<Public />} />
                <Route path="login" element={<Login />} />

                {/* Protected routes */}
                <Route
                    element={
                        <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
                    }>
                    <Route element={<PersistLogin />}>
                        <Route element={<Prefetch />}>
                            <Route path="dash" element={<DashLayout />}>
                                <Route index element={<Welcome />} />

                                <Route
                                    element={
                                        <RequireAuth
                                            allowedRoles={[
                                                ROLES.Manager,
                                                ROLES.Admin,
                                            ]}
                                        />
                                    }>
                                    <Route path="users">
                                        <Route index element={<UsersList />} />
                                        <Route
                                            path=":id"
                                            element={<EditUser />}
                                        />
                                        <Route
                                            path="new"
                                            element={<NewUserForm />}
                                        />
                                    </Route>
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
                </Route>
            </Route>
        </Routes>
    )
}

export default App
