import { ReactElement, useRef } from 'react'
import { FileInput, InputWithDatalist, RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { getAlbums } from '../../redux/slices/albums'
import { hideOverlay } from '../../redux/slices/overlay'
import { fetchAddPhotos } from '../../redux/slices/photos'
import { hideWindow } from '../../redux/slices/window'
import { AddPhotoFormEvent, DataListElement } from '../../types'

const AddPhoto = (): ReactElement => {
    const dispatch = useAppDispatch()

    const albums = useAppSelector(getAlbums)

    const windowEl = useRef<HTMLDivElement>(null)

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
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

            dispatch(hideOverlay())
            dispatch(hideWindow())
        } catch (e) {
            alert('Не вдалось додати фото')
        }
    }

    const elements: DataListElement[] | undefined = albums?.map((item) => ({
        text: item.name,
        id: item._id,
    }))

    useOutsideClick(windowEl, handleOutsideClick, ['context-menu'])

    return (
        <div className="window" ref={windowEl}>
            <form
                className="form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <p className="window__text">
                    Введіть назву нового або вже існуючого альбому, в який
                    помістите фото
                </p>
                <div className="window-container">
                    <FileInput
                        text="Натисніть, щоб обрати файл"
                        name="photos"
                        multiple={true}
                    />
                </div>
                <div className="window__input">
                    <InputWithDatalist
                        elements={elements ? elements : []}
                        name="albumName"
                        style={{ bottom: '95%' }}
                    />
                </div>
                <div className="buttons-container">
                    <div onClick={handleBackClick}>
                        <RoundedButton text="Назад" style="dark" />
                    </div>
                    <div>
                        <RoundedButton text="Додати" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddPhoto
