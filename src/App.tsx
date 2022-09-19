import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { isMobile, setIsMobile } from './redux/slices/device'
import throttle from './utils/thorttle'
import './style/reset.scss'
import './style/index.scss'
import {
    AddingButton,
    AddingMenu,
    Header,
    MobileNavigation,
    Overlay,
} from './components'
import { Login, Main } from './pages'
import { getCurrentPage } from './redux/slices/page'
import Registration from './pages/Registration'
import { fetchMe, getUser } from './redux/slices/auth'
import AddAlbumWindow from './components/AddAlbumWindow'
import { fetchAlbums } from './redux/slices/albums'
import AddAlbumMenu from './components/AddAlbumMenu'

function App() {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(getUser)

    const resizeHandler = (e: UIEvent): void => {
        if (window.innerWidth <= 768) {
            dispatch(setIsMobile(true))
        } else {
            dispatch(setIsMobile(false))
        }
    }

    useEffect(() => {
        if (auth.data) {
            dispatch(fetchAlbums())
        }
    }, [auth.data])

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
            <AddingButton />
            <AddingMenu />
            <AddAlbumWindow />
            <AddAlbumMenu />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/" element={<Main />} />
            </Routes>
        </div>
    )
}

export default App
