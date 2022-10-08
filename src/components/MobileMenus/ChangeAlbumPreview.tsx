import { ReactElement, useRef } from 'react'
import { FileInput, RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { fetchChangePreview } from '../../redux/slices/albums'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import { hideWindow } from '../../redux/slices/window'
import { FileFormEvent } from '../../types'

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
            dispatch(hideWindow())
        } catch (e) {
            alert('Не вдалось оновити превью')
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
                <div className="mobile-menu__buttons">
                    <div
                        className="mobile-menu__button"
                        onClick={handleBackClick}
                    >
                        <RoundedButton
                            text="Назад"
                            style="dark"
                            type="button"
                        />
                    </div>
                    <div className="mobile-menu__buttons">
                        <RoundedButton text="Встановити" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChangeAlbumPreview
