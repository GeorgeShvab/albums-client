import { ReactElement, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { fetchChangeVisibility } from '../../redux/slices/albums'
import { hideOverlay } from '../../redux/slices/overlay'
import { getWindowState, hideWindow } from '../../redux/slices/window'
import RoundedButton from '../RoundedButton'

const ChangeAlbumVisibilityWindow = (): ReactElement => {
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

    const handleChangeVisibilityClick = async () => {
        try {
            const data = await dispatch(
                fetchChangeVisibility({
                    albumId: window.data.album._id,
                    visibility:
                        window.data.album.visibility === 'public'
                            ? 'private'
                            : 'public',
                })
            )
            if (!data.payload.success) {
                alert('Помилка при зміні видимості')
                return
            }
            dispatch(hideOverlay())
            dispatch(hideWindow())
        } catch (e) {
            alert('Помилка при зміні видимості')
        }
    }

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    return (
        <div className="window" ref={windowEl}>
            <p className="window__text">
                Перевторити{' '}
                <span className="highlited">{window.data.album.name}</span> на{' '}
                {window.data.album.visibility === 'private'
                    ? 'публічний'
                    : 'приватний'}{' '}
                альбом?
            </p>
            <div className="buttons-container">
                <div onClick={handleBackClick}>
                    <RoundedButton text="Назад" style="dark" />
                </div>
                <div onClick={handleChangeVisibilityClick}>
                    <RoundedButton text="Перетворити" />
                </div>
            </div>
        </div>
    )
}

export default ChangeAlbumVisibilityWindow
