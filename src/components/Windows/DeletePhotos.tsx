import { ReactElement, useRef } from 'react'
import { RoundedButton } from '..'
import { useAppDispatch } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { hideOverlay } from '../../redux/slices/overlay'
import { fetchDeletePhotos } from '../../redux/slices/photos'
import { deactivateSelectionMode } from '../../redux/slices/selectionMode'
import { hideWindow } from '../../redux/slices/window'

const DeletePhotos = (): ReactElement => {
    const dispatch = useAppDispatch()

    const windowEl = useRef<HTMLDivElement>(null)

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    const handleDeleteClick = async () => {
        try {
            await dispatch(fetchDeletePhotos()).unwrap()
            dispatch(deactivateSelectionMode())
            dispatch(hideOverlay())
            dispatch(hideWindow())
        } catch (e) {
            alert('Не вдалось видалити фото')
        }
    }

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    useOutsideClick(windowEl, handleOutsideClick, [
        'context-menu',
        'album-page__heading-btn',
    ])

    return (
        <div className="window" ref={windowEl}>
            <p className="window__text">
                Ви впевнені, що хочете видалити обрані фотографії?
            </p>
            <div className="buttons-container">
                <div onClick={handleBackClick}>
                    <RoundedButton text="Назад" style="dark" />
                </div>
                <div onClick={handleDeleteClick}>
                    <RoundedButton text="Видалити" />
                </div>
            </div>
        </div>
    )
}

export default DeletePhotos
