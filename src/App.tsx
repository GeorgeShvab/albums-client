import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { isMobile, setIsMobile } from './redux/slices/device'
import throttle from './utils/thorttle'
import './style/reset.scss'
import './style/index.scss'
import { Header, MobileNavigation, Overlay } from './components'
import { Login, Main } from './pages'
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

    useEffect(() => {
        window.addEventListener('resize', throttle(resizeHandler, 500))

        if (localStorage.getItem('Authorization')) {
            dispatch(fetchMe())
        }

        return (): void => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return (
        <div className="App">
            <Overlay />
            <MobileNavigation />
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/" element={<Main />} />
            </Routes>
        </div>
    )
}

export default App
