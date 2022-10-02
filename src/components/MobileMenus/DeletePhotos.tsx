import { ReactElement, useRef } from 'react'
import { RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import { fetchDeletePhotos } from '../../redux/slices/photos'
import { deactivateSelectionMode } from '../../redux/slices/selectionMode'

const DeletePhotos = (): ReactElement => {
    const menuState = useAppSelector(getMobileMenuState)

    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const handleDeleteClick = async () => {
        try {
            await dispatch(fetchDeletePhotos()).unwrap()
            dispatch(deactivateSelectionMode())
            dispatch(hideOverlay())
            dispatch(hideMobileMenu())
        } catch (e) {
            alert('Не вдалось видалити фото')
        }
    }

    const handleOutsideClick = () => {
        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    useOutsideClick(mobileMenuEl, handleOutsideClick, [
        'context-menu',
        'mobile-button',
    ])

    if (menuState.type !== 'delete-photos' || !menuState.state) return <></>

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <p className="mobile-menu__text">
                Ви впевнені, що хочете видалити обрані фотографії?
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

export default DeletePhotos
