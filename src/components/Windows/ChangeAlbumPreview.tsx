import { FormEvent, ReactElement, useRef } from 'react'
import { FileInput, RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { fetchChangePreview } from '../../redux/slices/albums'
import { hideOverlay } from '../../redux/slices/overlay'
import { getWindowState, hideWindow } from '../../redux/slices/window'
import { FileFormEvent } from '../../types'

const ChangeAlbumPreview = (): ReactElement => {
    const window = useAppSelector(getWindowState)
    const dispatch = useAppDispatch()

    const windowEl = useRef<HTMLDivElement>(null)

    const handleOutsideClick = (): void => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    const handleBackClick = (): void => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    const handleSubmit = async (e: FileFormEvent) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.target)
            const data = await dispatch(
                fetchChangePreview({
                    albumId: window.data.album._id,
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

    useOutsideClick(windowEl, handleOutsideClick, ['context-menu'])

    if (!window.state || window.type !== 'change-album-preview') return <></>

    return (
        <div className="window" ref={windowEl}>
            <form action="" onSubmit={handleSubmit}>
                <p className="window__text">
                    Завантажте фото, щоб встановити його як превью для вашого
                    альбому
                </p>
                <div className="window-container">
                    <FileInput
                        text="Натисніть, щоб обрати файл"
                        name="background"
                    />
                </div>
                <div className="buttons-container">
                    <div onClick={handleBackClick}>
                        <RoundedButton
                            text="Назад"
                            style="dark"
                            type="button"
                        />
                    </div>
                    <div>
                        <RoundedButton text="Встановити" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChangeAlbumPreview