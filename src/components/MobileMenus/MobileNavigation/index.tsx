import { ReactElement, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import useOutsideClick from '../../../hooks/useOutsideClick'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../../redux/slices/mobileMenu'
import { hideOverlay } from '../../../redux/slices/overlay'
import RoundedButton from '../../RoundedButton'

const MobileNavigation = (): ReactElement => {
    const menuState = useAppSelector(getMobileMenuState)
    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const authToken: string | null = localStorage.getItem('Authorization')

    const outsideClickFunc = () => {
        if (menuState.type !== 'navigation' || !menuState.state) return

        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    const menuClickHandler = () => {
        if (menuState.type !== 'navigation' || !menuState.state) return

        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    useOutsideClick(mobileMenuEl, outsideClickFunc, [
        menuState.type === 'navigation' ? 'nav__menu-btn' : 'adding-button',
    ])

    if (menuState.type !== 'navigation' || !menuState.state) return <></>

    return (
        <div
            className={`mobile-menu${
                menuState.type === 'navigation' && menuState.state
                    ? ' _show'
                    : ''
            }`}
            ref={mobileMenuEl}
        >
            <ul className="mobile-menu__list">
                {authToken ? (
                    <>
                        <li
                            className="mobile-menu__item"
                            onClick={menuClickHandler}
                        >
                            <Link to="/home">
                                <h5>Головна</h5>
                            </Link>
                        </li>
                        <li
                            className="mobile-menu__item"
                            onClick={menuClickHandler}
                        >
                            <Link to="/albums">
                                <h5>Альбоми</h5>
                            </Link>
                        </li>
                        <li
                            className="mobile-menu__item"
                            onClick={menuClickHandler}
                        >
                            <Link to="/photos">
                                <h5>Фото</h5>
                            </Link>
                        </li>
                        <li
                            className="mobile-menu__item"
                            onClick={menuClickHandler}
                        >
                            <Link to="/settings">
                                <h5>Налаштування</h5>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li
                            className="mobile-menu__item unauthorized"
                            onClick={menuClickHandler}
                        >
                            <Link to="/settings">
                                <h5>Головна</h5>
                            </Link>
                        </li>
                        <li
                            className="mobile-menu__item"
                            onClick={menuClickHandler}
                        >
                            <Link to="/registration">
                                <RoundedButton text="Реєстрація" style="dark" />
                            </Link>
                        </li>
                        <li
                            className="mobile-menu__item"
                            onClick={menuClickHandler}
                        >
                            <Link to="/login">
                                <RoundedButton text="Вхід" />
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default MobileNavigation
