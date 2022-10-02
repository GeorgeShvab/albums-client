import { ReactElement, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import useOutsideClick from '../../../hooks/useOutsideClick'
import { fetchDeleteAlbum } from '../../../redux/slices/albums'
import { hideOverlay } from '../../../redux/slices/overlay'
import { getWindowState, hideWindow } from '../../../redux/slices/window'
import RoundedButton from '../../RoundedButton'

const DeleteAlbumWindow = (): ReactElement => {
    const window = useAppSelector(getWindowState)
    const dispatch = useAppDispatch()

    const windowEl = useRef<HTMLDivElement>(null)

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    useOutsideClick(windowEl, handleOutsideClick, [
        'context-menu',
        'album-heading__item',
    ])

    if (window.type !== 'delete-album' || !window.state) return <></>

    const handleDeleteClick = async () => {
        try {
            const data = await dispatch(fetchDeleteAlbum(window.data.album._id))
            if (!data.payload.success) {
                alert('Помилка при видаленні')
                return
            }
            dispatch(hideOverlay())
            dispatch(hideWindow())
        } catch (e) {
            alert('Помилка при видаленні')
        }
    }

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    return (
        <div className="window delete-album" ref={windowEl}>
            <p className="window__text">
                Ви впевнені, що хочете видалити{' '}
                <span className="highlited">{window.data.album.name}</span>?
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

export default DeleteAlbumWindow
