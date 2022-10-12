import { ReactElement, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { authorized, getUser } from '../../redux/slices/auth'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import RoundedButton from '../RoundedButton'
import MobileMenuItem from './MobileMenuItem'
import defaultAvatar from '../../static/default-avatar.jpg'

const MobileNavigation = (): ReactElement => {
    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const isAuthorized: boolean = useAppSelector(authorized)
    const user = useAppSelector(getUser)
    const menuState = useAppSelector(getMobileMenuState)

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
                        <MobileMenuItem
                            children={
                                <Avatar
                                    style={{ height: '70px', width: '70px' }}
                                    avatarUrl={
                                        user.data?.avatar
                                            ? `${process.env.REACT_APP_SERVER_ADDRESS}/static/avatars/${user.data?._id}/${user.data?.avatar}`
                                            : defaultAvatar
                                    }
                                />
                            }
                            link={'/' + user.data?._id}
                        />
                    </li>
                    <li onClick={menuClickHandler}>
                        <MobileMenuItem children="Альбоми" link="/albums" />
                    </li>
                    <li onClick={menuClickHandler}>
                        <MobileMenuItem children="Головна" link="/home" />
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
