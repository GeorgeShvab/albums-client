import { ReactElement, useRef } from 'react'
import { FileInput, InputWithDatalist, RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { getAlbums } from '../../redux/slices/albums'
import { hideMobileMenu } from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import { fetchAddPhotos } from '../../redux/slices/photos'
import { AddPhotoFormEvent, DataListElement } from '../../types'
import MobileMenuItem from './MobileMenuItem'

const AddPhoto = (): ReactElement => {
    const dispatch = useAppDispatch()

    const albums = useAppSelector(getAlbums)

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
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
            dispatch(hideMobileMenu())
        } catch (e) {
            alert('Не вдалось додати фото')
        }
    }

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    useOutsideClick(mobileMenuEl, handleOutsideClick, [
        'context-menu',
        'mobile-menu',
    ])

    const elements: DataListElement[] | undefined = albums?.map((item) => ({
        text: item.name,
        id: item._id,
    }))

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <form
                action=""
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <p className="mobile-menu__text">
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
                <div className="mobile-menu__input">
                    <InputWithDatalist
                        elements={elements ? elements : []}
                        name="albumName"
                        style={{ bottom: '95%' }}
                    />
                </div>
                <ul className="mobile-menu__list">
                    <li onClick={handleBackClick}>
                        <MobileMenuItem
                            children={
                                <RoundedButton
                                    text="Назад"
                                    style="dark"
                                    type="button"
                                />
                            }
                        />
                    </li>
                    <li>
                        <MobileMenuItem
                            children={
                                <RoundedButton text="Додати" type="submit" />
                            }
                        />
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default AddPhoto
