import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { isMobile } from '../../redux/slices/device'
import { showMobileMenu } from '../../redux/slices/mobileMenu'
import { showOverlay } from '../../redux/slices/overlay'
import { getCurrentPage } from '../../redux/slices/page'
import HeaderSvgs from '../HeaderSvgs'
import './style.scss'

const Header = (): ReactElement => {
    const mobile = useAppSelector(isMobile)
    const page = useAppSelector(getCurrentPage)

    const dispatch = useAppDispatch()

    const handleMenuClick = () => {
        dispatch(showOverlay())
        dispatch(showMobileMenu())
    }

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">Albums</Link>
                </div>
                <div className="nav">
                    {mobile ? (
                        <button
                            className="nav__menu-btn"
                            onClick={handleMenuClick}
                        >
                            <div>
                                <span></span>
                            </div>
                        </button>
                    ) : (
                        <ul className="nav__list">
                            <li className="nav__list-item">
                                <HeaderSvgs page="add-photo" />
                            </li>
                            <li
                                className={`nav__list-item${
                                    page === 'home' ? ' _choosed' : ''
                                }`}
                            >
                                <Link to="/home">
                                    <HeaderSvgs page="home" />
                                </Link>
                            </li>
                            <li
                                className={`nav__list-item${
                                    page === 'albums' ? ' _choosed' : ''
                                }`}
                            >
                                <Link to="/albums">
                                    <HeaderSvgs page="albums" />
                                </Link>
                            </li>
                            <li
                                className={`nav__list-item${
                                    page === 'photos' ? ' _choosed' : ''
                                }`}
                            >
                                <Link to="/photos">
                                    <HeaderSvgs page="photos" />
                                </Link>
                            </li>
                            <li
                                className={`nav__list-item${
                                    page === 'settings' ? ' _choosed' : ''
                                }`}
                            >
                                <Link to="/settings">
                                    <HeaderSvgs page="settings" />
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
