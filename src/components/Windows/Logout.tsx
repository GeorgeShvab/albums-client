import { ReactElement, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoundedButton } from '..'
import { useAppDispatch } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { logout } from '../../redux/slices/auth'
import { hideOverlay } from '../../redux/slices/overlay'
import { hideWindow } from '../../redux/slices/window'

const Logout = (): ReactElement => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const windowEl = useRef<HTMLDivElement>(null)

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    const handleLogout = () => {
        logout(dispatch)
        handleBackClick()
        navigate('/login')
    }

    useOutsideClick(windowEl, handleOutsideClick, [
        'context-menu',
        'album-heading__item',
    ])

    return (
        <div className="window delete-album" ref={windowEl}>
            <p className="window__text">
                Ви впевнені, що хочете вийти з аккаунту?
            </p>
            <div className="buttons-container">
                <div onClick={handleBackClick}>
                    <RoundedButton text="Назад" style="dark" />
                </div>
                <div onClick={handleLogout}>
                    <RoundedButton text="Вийти" />
                </div>
            </div>
        </div>
    )
}

export default Logout
