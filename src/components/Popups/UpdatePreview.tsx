import { ReactElement } from 'react'
import { FileInput, InputWithDatalist, RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    fetchChangePreview,
    fetchDeletePreview,
} from '../../redux/slices/albums'
import { closePopup, getPopupState } from '../../redux/slices/popup'
import { FileFormEvent } from '../../types'

const UpdatePreview = (): ReactElement => {
    const dispatch = useAppDispatch()

    const handleBackClick = () => {
        closePopup(dispatch)
    }

    const popupState = useAppSelector(getPopupState)

    const handleSubmit = async (e: FileFormEvent) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.target)
            const data = await dispatch(
                fetchChangePreview({
                    albumId: popupState.data.album._id,
                    body: formData,
                })
            )
            if (!data.payload.success) {
                alert('Не вдалось оновити превью')
                return
            }

            closePopup(dispatch)
        } catch (e) {
            alert('Не вдалось оновити превью')
        }
    }

    const handleDeletePreview = async () => {
        try {
            await dispatch(fetchDeletePreview(popupState.data.album._id))

            closePopup(dispatch)
        } catch (e: any) {
            alert('Не вдалось видалити превью')
        }
    }

    return (
        <div className="popup" style={{ maxWidth: '580px' }}>
            <p className="popup__text">
                Завантажте фото, щоб встановити його як превью для вашого
                альбому
            </p>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="popup__btn-group" style={{ maxWidth: '520px' }}>
                    <FileInput
                        text="Натисніть, щоб обрати файл"
                        name="background"
                        multiple={false}
                    />
                    <div onClick={handleBackClick}>
                        <RoundedButton style="light" text="Назад" />
                    </div>
                    {popupState.data?.album?.background ? (
                        <div onClick={handleDeletePreview}>
                            <RoundedButton
                                style="light"
                                text="Видалити превью"
                            />
                        </div>
                    ) : (
                        ''
                    )}
                    <div>
                        <RoundedButton
                            style="dark"
                            text="Встановити"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdatePreview
