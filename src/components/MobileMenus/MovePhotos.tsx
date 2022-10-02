import { FormEvent, ReactElement, useRef } from 'react'
import { InputWithDatalist, RoundedButton, Select } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { getAlbum } from '../../redux/slices/album'
import { getAlbums } from '../../redux/slices/albums'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import { fetchMovePhotos } from '../../redux/slices/photos'
import { deactivateSelectionMode } from '../../redux/slices/selectionMode'
import { getWindowState } from '../../redux/slices/window'
import { DataListElement, SelectElement } from '../../types'
import getNewAlbumName from '../../utils/getNewAlbumName'

const MovePhotos = (): ReactElement => {
    const dispatch = useAppDispatch()

    const menuState = useAppSelector(getMobileMenuState)
    const albums = useAppSelector(getAlbums)
    const album = useAppSelector(getAlbum)

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    useOutsideClick(mobileMenuEl, handleOutsideClick, [
        'mobile-button',
        'context-menu',
    ])

    if (menuState.type !== 'move-photos' || !menuState.state) return <></>

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
            dispatch(hideMobileMenu())
            dispatch(deactivateSelectionMode())
        } catch (e) {
            alert('Не вдалось перемістити альбом')
        }
    }

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <form onSubmit={handleSubmit} className="form">
                <p className="mobile-menu__text">
                    Виберіть альбом в який перемістити фото
                </p>
                <div className="mobile-menu__input">
                    <InputWithDatalist
                        elements={elements}
                        name="album"
                        style={{ bottom: '95%' }}
                    />
                </div>
                <div className="mobile-menu__buttons">
                    <div
                        className="mobile-menu__button"
                        onClick={handleBackClick}
                    >
                        <RoundedButton text="Назад" style="dark" />
                    </div>
                    <div className="mobile-menu__button">
                        <RoundedButton text="Перемістити" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MovePhotos
