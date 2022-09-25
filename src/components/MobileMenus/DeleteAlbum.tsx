import { ReactElement, useRef } from 'react'
import { Link } from 'react-router-dom'
import { RoundedButton } from '..'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { fetchDeleteAlbum } from '../../redux/slices/albums'
import {
    getMobileMenuState,
    hideMobileMenu,
    showMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'

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

    useOutsideClick(mobileMenuEl, handleOutsideClick, ['context-menu'])

    if (menuState.type !== 'delete-album' || !menuState.state) return <></>

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <p className="mobile-menu__text">
                Ви впевнені, що хочете видалити{' '}
                <span className="highlited">{menuState.data.album.name}</span>?
            </p>
            <div className="mobile-menu__buttons">
                <div className="mobile-menu__button" onClick={handleBackClick}>
                    <RoundedButton text="Назад" style="dark" />
                </div>
                <div
                    className="mobile-menu__button"
                    onClick={handleDeleteClick}
                >
                    <RoundedButton text="Видалити" />
                </div>
            </div>
        </div>
    )
}

export default DeleteAlbum
