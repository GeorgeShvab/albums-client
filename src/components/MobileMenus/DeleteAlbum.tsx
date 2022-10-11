import { ReactElement, useRef } from 'react'
import { RoundedButton } from '..'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { fetchDeleteAlbum } from '../../redux/slices/albums'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import MobileMenuItem from './MobileMenuItem'

const DeleteAlbum = (): ReactElement => {
    const menuState = useAppSelector(getMobileMenuState)
    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const handleOutsideClick = () => {
        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    const handleDeleteClick = async () => {
        try {
            const data = await dispatch(
                fetchDeleteAlbum(menuState.data.album._id)
            )
            if (!data.payload.success) {
                alert('Помилка при видаленні')
                return
            }
            dispatch(hideOverlay())
            dispatch(hideMobileMenu())
        } catch (e) {
            alert('Помилка при видаленні')
        }
    }

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    useOutsideClick(mobileMenuEl, handleOutsideClick, [
        'context-menu',
        'album-heading__item',
    ])

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <p className="mobile-menu__text">
                Ви впевнені, що хочете видалити{' '}
                <span className="highlited">{menuState.data.album.name}</span>?
            </p>
            <ul className="mobile-menu__list">
                <li onClick={handleBackClick}>
                    <MobileMenuItem children={<RoundedButton text="Назад" />} />
                </li>
                <li onClick={handleDeleteClick}>
                    <MobileMenuItem
                        children={
                            <RoundedButton text="Видалити" style="dark" />
                        }
                    />
                </li>
            </ul>
        </div>
    )
}

export default DeleteAlbum
