import { ReactElement, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import './style.scss'

const MobileMenu = (): ReactElement => {
    const menuState = useAppSelector(getMobileMenuState)
    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const outsideClickFunc = () => {
        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    useOutsideClick(mobileMenuEl, outsideClickFunc, ['nav__menu-btn'])

    return (
        <div
            className={`mobile-menu${menuState ? ' _show' : ''}`}
            ref={mobileMenuEl}
        >
            <ul className="mobile-menu__list">
                <li className="mobile-menu__item">
                    <Link to="/home">
                        <h5>Головна</h5>
                    </Link>
                </li>
                <li className="mobile-menu__item">
                    <Link to="/albums">
                        <h5>Альбоми</h5>
                    </Link>
                </li>
                <li className="mobile-menu__item">
                    <Link to="/photos">
                        <h5>Фото</h5>
                    </Link>
                </li>
                <li className="mobile-menu__item">
                    <Link to="/settings">
                        <h5>Налаштування</h5>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default MobileMenu
