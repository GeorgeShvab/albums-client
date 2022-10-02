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

    const elements: DataListElement[] = albums
        ? [
              ...albums
                  ?.map((item) => ({
                      text: item.name,
                      value: item._id,
                      id: item._id,
                  }))
                  .filter((item) => item.id !== album?._id),
          ]
        : []

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement> & {
            target: { album: HTMLInputElement }
        }
    ) => {
        e.preventDefault()
        try {
            await dispatch(
                fetchMovePhotos({
                    newAlbum:
                        !e.target.album.dataset.albumid &&
                        e.target.album.value.trim()
                            ? e.target.album.value.trim()
                            : false,
                    albumId: e.target.album.dataset.albumid,
                })
            ).unwrap()

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
                    Виберіть альбом в який перемістити фото
                </p>
                <div className="window__input">
                    <InputWithDatalist
                        elements={elements}
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
