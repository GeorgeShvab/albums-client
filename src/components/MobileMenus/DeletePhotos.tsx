import { ReactElement, useRef } from 'react'
import { RoundedButton } from '..'
import { useAppDispatch } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { hideMobileMenu } from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import { fetchDeletePhotos } from '../../redux/slices/photos'
import { deactivateSelectionMode } from '../../redux/slices/selectionMode'
import MobileMenuItem from './MobileMenuItem'

const DeletePhotos = (): ReactElement => {
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

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <p className="mobile-menu__text">
                Ви впевнені, що хочете видалити обрані фотографії?
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

export default DeletePhotos
