import { ReactElement } from 'react'
import { FileInput, InputWithDatalist, RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getAlbums } from '../../redux/slices/albums'
import { fetchAddPhotos } from '../../redux/slices/photos'
import { closePopup } from '../../redux/slices/popup'
import { AddPhotoFormEvent, DataListElement } from '../../types'

const AddPhoto = (): ReactElement => {
    const dispatch = useAppDispatch()

    const albums = useAppSelector(getAlbums)

    const handleBackClick = () => {
        closePopup(dispatch)
    }

    const handleSubmit = async (e: AddPhotoFormEvent) => {
        e.preventDefault()
        try {
            if (!e.target.photos.files) throw new Error('Немає файлів')

            if (!e.target.albumName.value) {
                alert("Некорректне ім'я альбому")
                return
            }

            const formData = new FormData(e.target)

            const albumId = albums?.find(
                (item) => item.name === e.target.albumName.value
            )?._id

            if (albumId) {
                formData.append('album', albumId)
            } else {
                formData.append(
                    'album',
                    JSON.stringify({
                        name: e.target.albumName.value,
                        visibility: 'private',
                    })
                )
            }

            await dispatch(fetchAddPhotos(formData)).unwrap()

            closePopup(dispatch)
        } catch (e) {
            alert('Не вдалось додати фото')
        }
    }

    const elements: DataListElement[] | undefined = albums?.map((item) => ({
        text: item.name,
        id: item._id,
    }))

    return (
        <div className="popup" style={{ maxWidth: '580px' }}>
            <p className="popup__text">
                Введіть назву альбому, в який хочете додати фото
            </p>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="popup__btn-group">
                    <FileInput
                        text="Натисніть, щоб обрати файл"
                        name="photos"
                        multiple={true}
                    />
                    <InputWithDatalist
                        elements={elements ? elements : []}
                        name="albumName"
                        style={{ bottom: '95%' }}
                    />
                    <div onClick={handleBackClick}>
                        <RoundedButton style="light" text="Назад" />
                    </div>
                    <div>
                        <RoundedButton
                            style="dark"
                            text="Додати"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddPhoto
