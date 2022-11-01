import { FormEvent, ReactElement } from 'react'
import { InputWithDatalist, RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getAlbum } from '../../redux/slices/album'
import { getAlbums } from '../../redux/slices/albums'
import { fetchMovePhotos } from '../../redux/slices/photos'
import { closePopup } from '../../redux/slices/popup'
import { deactivateSelectionMode } from '../../redux/slices/selectionMode'
import { DataListElement } from '../../types'

const MovePhotos = (): ReactElement => {
    const dispatch = useAppDispatch()

    const albums = useAppSelector(getAlbums)
    const album = useAppSelector(getAlbum)

    const elements: DataListElement[] | undefined = albums
        ?.map((item) => ({
            text: item.name,
            id: item._id,
        }))
        .filter((item) => item.id !== album?._id)

    const handleBackClick = () => {
        closePopup(dispatch)
    }

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

            // Шукаємо обраний альбом
            const albumId: string | undefined = albums?.find(
                (item) => item.name === e.target.album.value.trim()
            )?._id

            // Перевіряємо чи альбом є, якшо нема то передаємо параметри шоб створити новий
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

            closePopup(dispatch)
            dispatch(deactivateSelectionMode())
        } catch (e) {
            alert('Не вдалось перемістити фото')
        }
    }

    return (
        <div className="popup">
            <p className="popup__text">
                Введіть назву альбому, в який хочете перемістити обрані фото
            </p>
            <form onSubmit={handleSubmit}>
                <div className="popup__btn-group" style={{ maxWidth: '520px' }}>
                    <InputWithDatalist
                        elements={elements ? elements : []}
                        name="album"
                        style={{ bottom: '95%', flex: '0 0 100%' }}
                    />
                    <div onClick={handleBackClick}>
                        <RoundedButton style="light" text="Назад" />
                    </div>
                    <div>
                        <RoundedButton
                            style="dark"
                            text="Перемістити"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MovePhotos
