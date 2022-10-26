import { ReactElement, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { logout } from '../../redux/slices/auth'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import RoundedButton from '../RoundedButton'
import MobileMenuItem from './MobileMenuItem'

const Logout = (): ReactElement => {
    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    const handleLogout = () => {
        dispatch(logout())
        handleBackClick()
        navigate('/login')
    }

    useOutsideClick(mobileMenuEl, handleOutsideClick, [
        'context-menu',
        'album-heading__item',
    ])

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <p className="mobile-menu__text">
                Ви впевнені, що хочете вийти з аккаунту?
            </p>
            <ul className="mobile-menu__list">
                <li onClick={handleBackClick}>
                    <MobileMenuItem children={<RoundedButton text="Назад" />} />
                </li>
                <li onClick={handleLogout}>
                    <MobileMenuItem
                        children={<RoundedButton text="Вийти" style="dark" />}
                    />
                </li>
            </ul>
        </div>
    )
}

export default Logout
