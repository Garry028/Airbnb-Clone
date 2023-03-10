import { Route, Routes, BrowserRouter } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import PlacesPage from './pages/PlacesPage'
function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/account/:subpage?" element={<AccountPage />} />
                <Route path="/account/:subpage?" element={<AccountPage />} />
                <Route path='/account/:subpage/:action' element={<AccountPage/>} />
            </Route>
        </Routes>
    )
}
export default App
