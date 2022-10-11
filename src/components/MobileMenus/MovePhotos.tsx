import { FormEvent, ReactElement, useRef } from 'react'
import { InputWithDatalist, RoundedButton, Select } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { getAlbum } from '../../redux/slices/album'
import { getAlbums } from '../../redux/slices/albums'
import { hideMobileMenu } from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import { fetchMovePhotos } from '../../redux/slices/photos'
import { deactivateSelectionMode } from '../../redux/slices/selectionMode'
import { DataListElement } from '../../types'
import MobileMenuItem from './MobileMenuItem'

const MovePhotos = (): ReactElement => {
    const dispatch = useAppDispatch()

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
                <ul className="mobile-menu__list">
                    <li onClick={handleBackClick}>
                        <MobileMenuItem
                            children={<RoundedButton text="Назад" />}
                        />
                    </li>
                    <li>
                        <MobileMenuItem
                            children={
                                <RoundedButton
                                    text="Перемістити"
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

export default MovePhotos
