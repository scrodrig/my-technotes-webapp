import { Route, Routes } from 'react-router-dom'

import Layout from 'src/components/Layout'
import Login from 'src/components/Login'
import Public from 'src/components/Public'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Public />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    )
}

export default App
