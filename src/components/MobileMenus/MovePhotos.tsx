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
                await dispatch(
                    fetchMovePhotos({
                        album: albumId,
                    })
                ).unwrap()
            } else {
                await dispatch(
                    fetchMovePhotos({
                        album: {
                            name: e.target.album.value,
                            visibility: 'private',
                        },
                    })
                ).unwrap()
            }

            dispatch(hideOverlay())
            dispatch(hideMobileMenu())
            dispatch(deactivateSelectionMode())
        } catch (e) {
            alert('Не вдалось перемістити фото')
        }
    }

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <form onSubmit={handleSubmit} className="form">
                <p className="mobile-menu__text">
                    Введіть назву нового або вже існуючого альбому, в який
                    хочете перемістити фото
                </p>
                <div className="mobile-menu__input">
                    <InputWithDatalist
                        elements={elements ? elements : []}
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
