import { ReactElement, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import useOutsideClick from '../../../hooks/useOutsideClick'
import {
    getMobileMenuState,
    hideMobileMenu,
    showMobileMenu,
} from '../../../redux/slices/mobileMenu'
import { hideOverlay } from '../../../redux/slices/overlay'

const AddingMenu = (): ReactElement => {
    const menuState = useAppSelector(getMobileMenuState)
    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const outsideClickFunc = () => {
        if (menuState.type !== 'adding' || !menuState.state) return

        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    const menuClickHandler = () => {
        if (menuState.type !== 'adding' || !menuState.state) return

        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    const addAlbumClickHadler = () => {
        if (menuState.type !== 'adding' || !menuState.state) return

        dispatch(showMobileMenu('add-album'))
    }

    useOutsideClick(mobileMenuEl, outsideClickFunc, ['mobile-button'])

    if (menuState.type !== 'adding' || !menuState.state) return <></>

    return (
        <div
            className={`mobile-menu${
                menuState.type === 'adding' && menuState.state ? ' _show' : ''
            }`}
            ref={mobileMenuEl}
        >
            <ul className="mobile-menu__list">
                <li className="mobile-menu__item" onClick={menuClickHandler}>
                    <Link to="/add-photo">
                        <h5>Додати фото</h5>
                    </Link>
                </li>
                <li className="mobile-menu__item" onClick={addAlbumClickHadler}>
                    <h5>Додати альбом</h5>
                </li>
            </ul>
        </div>
    )
}

export default AddingMenu
