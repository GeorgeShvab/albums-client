import { memo, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { isMobile } from '../../redux/slices/device'
import { showPopup } from '../../redux/slices/popup'
import Nav from './Nav'
import './style.scss'

const Header = memo((): ReactElement => {
    const dispatch = useAppDispatch()

    const mobile = useAppSelector(isMobile)

    const handleMenuClick = () => {
        showPopup({ type: 'navigation', dispatch: dispatch })
    }

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">Albums</Link>
                </div>
                <div className="nav-container">
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
                        <Nav />
                    )}
                </div>
            </div>
        </header>
    )
})

export default Header
