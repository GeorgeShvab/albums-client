import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { isMobile, setIsMobile } from './redux/slices/device'
import throttle from './utils/thorttle'
import './style/reset.scss'
import './style/index.scss'
import { Header, Overlay } from './components'
import MobileMenu from './components/MobileMenu'
import { Login } from './pages'
import { getCurrentPage } from './redux/slices/page'
import Registration from './pages/Registration'
import { fetchMe } from './redux/slices/auth'

function App() {
    const dispatch = useAppDispatch()
    const page = useAppSelector(getCurrentPage)
    const mobile = useAppSelector(isMobile)
    const navigate = useNavigate()

    const resizeHandler = (e: UIEvent): void => {
        if (window.innerWidth <= 768) {
            dispatch(setIsMobile(true))
        } else {
            dispatch(setIsMobile(false))
        }
    }

    const tryToAuth = async () => {
        try {
            const data = await dispatch(fetchMe())
            if (!data.payload.success) {
                navigate('/login')
            }
        } catch (e) {
            navigate('/login')
        }
    }

    useEffect(() => {
        window.addEventListener('resize', throttle(resizeHandler, 500))

        if (localStorage.getItem('Authorization')) {
            tryToAuth()
        } else {
            navigate('/login')
        }

        return (): void => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return (
        <div className="App">
            <Overlay />
            <MobileMenu />
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </div>
    )
}

export default App
