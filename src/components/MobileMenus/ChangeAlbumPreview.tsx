import { ReactElement, useRef } from 'react'
import { FileInput, RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import {
    fetchChangePreview,
    fetchDeletePreview,
} from '../../redux/slices/albums'
import mobileMenu, {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import { hideWindow } from '../../redux/slices/window'
import { FileFormEvent } from '../../types'
import MobileMenuItem from './MobileMenuItem'

const ChangeAlbumPreview = (): ReactElement => {
    const menuState = useAppSelector(getMobileMenuState)
    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    const handleSubmit = async (e: FileFormEvent) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.target)
            const data = await dispatch(
                fetchChangePreview({
                    albumId: menuState.data.album._id,
                    body: formData,
                })
            )
            if (!data.payload.success) {
                alert('Не вдалось оновити превью')
                return
            }
            dispatch(hideOverlay())
            dispatch(hideMobileMenu())
        } catch (e) {
            alert('Не вдалось оновити превью')
        }
    }

    const handleDeletePreview = async () => {
        try {
            await dispatch(fetchDeletePreview(menuState.data.album._id))
            dispatch(hideOverlay())
            dispatch(hideMobileMenu())
        } catch (e: any) {
            alert('Не вдалось видалити превью')
        }
    }

    useOutsideClick(mobileMenuEl, handleOutsideClick, ['context-menu'])

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <form action="" onSubmit={handleSubmit}>
                <p className="mobile-menu__text">
                    Завантажте фото, щоб встановити його як превью для вашого
                    альбому
                </p>
                <div className="window-container">
                    <FileInput
                        text="Натисніть, щоб обрати файл"
                        name="background"
                    />
                </div>
                <ul className="mobile-menu__list">
                    {menuState.data?.album?.background ? (
                        <li onClick={handleDeletePreview}>
                            <MobileMenuItem
                                children={
                                    <RoundedButton text="Видалити превью" />
                                }
                            />
                        </li>
                    ) : (
                        ''
                    )}
                    <li onClick={handleBackClick}>
                        <MobileMenuItem
                            children={
                                <RoundedButton text="Назад" type="button" />
                            }
                        />
                    </li>
                    <li>
                        <MobileMenuItem
                            children={
                                <RoundedButton
                                    text="Встановити"
                                    type="submit"
                                    style="dark"
                                />
                            }
                        />
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default ChangeAlbumPreview
