import { FormEvent, ReactElement, useRef } from 'react'
import { InputWithDatalist, RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { getAlbum } from '../../redux/slices/album'
import { getAlbums } from '../../redux/slices/albums'
import { hideOverlay } from '../../redux/slices/overlay'
import { fetchMovePhotos } from '../../redux/slices/photos'
import { deactivateSelectionMode } from '../../redux/slices/selectionMode'
import { getWindowState, hideWindow } from '../../redux/slices/window'
import { DataListElement } from '../../types'

const MovePhotos = (): ReactElement => {
    const dispatch = useAppDispatch()

    const windowEl = useRef<HTMLDivElement>(null)

    const window = useAppSelector(getWindowState)
    const albums = useAppSelector(getAlbums)
    const album = useAppSelector(getAlbum)

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    const elements: DataListElement[] | undefined = albums
        ?.map((item) => ({
            text: item.name,
            id: item._id,
        }))
        .filter((item) => item.id !== album?._id)

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement> & {
            target: { album: HTMLInputElement }
        }
    ) => {
        e.preventDefault()

        try {
            if (!e.target.album.value.trim()) {
                alert('Некорректна назва')
                return
            }

            const albumId: string | undefined = albums?.find(
                (item) => item.name === e.target.album.value.trim()
            )?._id

            if (albumId) {
                dispatch(
                    fetchMovePhotos({
                        album: albumId,
                    })
                ).unwrap()
            } else {
                dispatch(
                    fetchMovePhotos({
                        album: {
                            name: e.target.album.value,
                            visibility: 'private',
                        },
                    })
                ).unwrap()
            }

            dispatch(hideOverlay())
            dispatch(hideWindow())
            dispatch(deactivateSelectionMode())
        } catch (e) {
            alert('Не вдалось перемістити альбом')
        }
    }

    useOutsideClick(windowEl, handleOutsideClick, [
        'context-menu',
        'album-page__heading-btn',
    ])

    if (window.type !== 'move-photos' || !window.state) return <></>

    return (
        <div className="window" ref={windowEl}>
            <form className="form" onSubmit={handleSubmit}>
                <p className="window__text">
                    Введіть назву нового або вже існуючого альбому, в який
                    хочете перемістити фото
                </p>
                <div className="window__input">
                    <InputWithDatalist
                        elements={elements ? elements : []}
                        name="album"
                        style={{ bottom: '95%' }}
                    />
                </div>
                <div className="buttons-container">
                    <div onClick={handleBackClick}>
                        <RoundedButton text="Назад" style="dark" />
                    </div>
                    <div>
                        <RoundedButton text="Перемістити" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MovePhotos
