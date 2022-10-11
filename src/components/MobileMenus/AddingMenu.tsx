import { ReactElement, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import {
    getMobileMenuState,
    hideMobileMenu,
    showMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay, showOverlay } from '../../redux/slices/overlay'
import RoundedButton from '../RoundedButton'
import MobileMenuItem from './MobileMenuItem'

const AddingMenu = (): ReactElement => {
    const menuState = useAppSelector(getMobileMenuState)
    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const outsideClickFunc = () => {
        if (menuState.type !== 'adding' || !menuState.state) return

        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    const addPhotoClickHadler = () => {
        dispatch(showOverlay())
        dispatch(showMobileMenu('add-photo'))
    }

    const addAlbumClickHadler = () => {
        if (menuState.type !== 'adding' || !menuState.state) return

        dispatch(showMobileMenu('add-album'))
    }

    useOutsideClick(mobileMenuEl, outsideClickFunc, ['mobile-button'])

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <ul className="mobile-menu__list">
                <li onClick={addPhotoClickHadler}>
                    <MobileMenuItem children="Додати фото" />
                </li>
                <li onClick={addAlbumClickHadler}>
                    <MobileMenuItem children="Додати альбом" />
                </li>
            </ul>
        </div>
    )
}

export default AddingMenu
