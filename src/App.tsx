import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { setIsMobile } from './redux/slices/device'
import throttle from './utils/thorttle'
import './style/reset.scss'
import './style/index.scss'
import { Header, Overlay } from './components'
import MobileMenu from './components/MobileMenu'
import { Login } from './pages'
import { getCurrentPage } from './redux/slices/page'

function App() {
    const dispatch = useAppDispatch()
    const page = useAppSelector(getCurrentPage)

    const resizeHandler = (e: UIEvent): void => {
        if (window.innerWidth <= 768) {
            dispatch(setIsMobile(true))
        } else {
            dispatch(setIsMobile(false))
        }
    }

    useEffect(() => {
        window.addEventListener('resize', throttle(resizeHandler, 500))

        return (): void => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return (
        <div
            className={`App${
                page === 'login' || page === 'registration'
                    ? ' _background-grey'
                    : ''
            }`}
        >
            <Overlay />
            <MobileMenu />
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<></>} />
            </Routes>
        </div>
    )
}

export default App
