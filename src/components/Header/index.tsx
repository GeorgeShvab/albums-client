import { ReactElement, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { isMobile } from '../../redux/slices/device'
import { showMobileMenu } from '../../redux/slices/mobileMenu'
import { showOverlay } from '../../redux/slices/overlay'
import { getCurrentPage } from '../../redux/slices/page'
import { showWindow } from '../../redux/slices/window'
import ContextMenu from '../ContextMenu'
import HeaderSvgs from '../HeaderSvgs'
import './style.scss'

const Header = (): ReactElement => {
    const mobile = useAppSelector(isMobile)
    const page = useAppSelector(getCurrentPage)
    const navigate = useNavigate()
    const [addingMenuState, setAddingMenuState] = useState(false)

    const addBtnEl = useRef<HTMLLIElement>(null)

    const authToken: string | null = localStorage.getItem('Authorization')

    const dispatch = useAppDispatch()

    const handleMenuClick = () => {
        dispatch(showOverlay())
        dispatch(showMobileMenu('navigation'))
    }

    const hadnleAddClick = () => {
        setAddingMenuState((prev) => !prev)
    }

    const handleAddAlbumClick = () => {
        dispatch(showOverlay())
        dispatch(showWindow('add-album'))
    }

    const handleOutsideClick = () => {
        setAddingMenuState(false)
    }

    useOutsideClick(addBtnEl, handleOutsideClick, ['context-menu'])

    // Якщо є токен авторизації, в низу якщо нема
    if (authToken) {
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
                                <li
                                    className="nav__list-item"
                                    onClick={hadnleAddClick}
                                    ref={addBtnEl}
                                >
                                    <HeaderSvgs page="add-photo" />
                                    {addingMenuState ? (
                                        <ContextMenu
                                            elements={[
                                                {
                                                    func: () =>
                                                        navigate('/add-photo'),
                                                    text: 'Додати фото',
                                                },
                                                {
                                                    func: handleAddAlbumClick,
                                                    text: 'Додати альбом',
                                                },
                                            ]}
                                            style={{ top: '130%' }}
                                        />
                                    ) : (
                                        ''
                                    )}
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

    //якщо нема токену
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
                                <Link to="/home">
                                    <h5>Головна</h5>
                                </Link>
                            </li>
                            <li className="nav__list-item auth-btn">
                                <Link to="/registration">
                                    <div className="header__registration header__auth-btn">
                                        <span>Реєстрація</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav__list-item auth-btn">
                                <Link to="/login">
                                    <div className="header__login header__auth-btn">
                                        <span>Вхід</span>
                                    </div>
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
