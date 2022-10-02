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
    DeleteAlbumWindow,
    FixedElementsContainer,
    FullScreenPhoto,
    Header,
    MobileNavigation,
    Overlay,
} from './components'
import { AlbumPage, Albums, Login, Main } from './pages'
import { getCurrentPage } from './redux/slices/page'
import Registration from './pages/Registration'
import { fetchMe, getUser } from './redux/slices/auth'
import { AddAlbumWindow } from './components'
import { fetchAlbums } from './redux/slices/albums'
import AddAlbumMenu from './components/MobileMenus/AddAlbumMenu'

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

        if (
            localStorage.getItem('Authorization') &&
            localStorage.getItem('Authorization') !== 'undefined' &&
            localStorage.getItem('Authorization') !== 'null'
        ) {
            dispatch(fetchMe())
        }

        return (): void => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return (
        <div className="App">
            <FixedElementsContainer />
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/" element={<Main />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/albums/:albumId/*" element={<AlbumPage />} />
            </Routes>
        </div>
    )
}

export default App
