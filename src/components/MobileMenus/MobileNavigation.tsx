import { ReactElement, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { authorized } from '../../redux/slices/auth'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import RoundedButton from '../RoundedButton'
import MobileMenuItem from './MobileMenuItem'

const MobileNavigation = (): ReactElement => {
    const menuState = useAppSelector(getMobileMenuState)
    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const isAuthorized: boolean = useAppSelector(authorized)

    const outsideClickFunc = () => {
        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    const menuClickHandler = () => {
        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    useOutsideClick(mobileMenuEl, outsideClickFunc, [
        menuState.type === 'navigation' ? 'nav__menu-btn' : 'adding-button',
    ])

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            {isAuthorized ? (
                <ul className="mobile-menu__list">
                    <li onClick={menuClickHandler}>
                        <MobileMenuItem children="Головна" link="/home" />
                    </li>
                    <li onClick={menuClickHandler}>
                        <MobileMenuItem children="Альбоми" link="/albums" />
                    </li>
                </ul>
            ) : (
                <ul className="mobile-menu__list _rounded-buttons">
                    <li onClick={menuClickHandler}>
                        <MobileMenuItem children="Головна" link="/" />
                    </li>
                    <li onClick={menuClickHandler}>
                        <MobileMenuItem
                            children={
                                <RoundedButton text="Реєстрація" style="dark" />
                            }
                            link="/registration"
                        />
                    </li>
                    <li onClick={menuClickHandler}>
                        <MobileMenuItem
                            children={<RoundedButton text="Вхід" />}
                            link="/login"
                        />
                    </li>
                </ul>
            )}
        </div>
    )
}

export default MobileNavigation
