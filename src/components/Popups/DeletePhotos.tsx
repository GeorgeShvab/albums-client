import { ReactElement } from 'react'
import { RoundedButton } from '..'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { fetchDeletePhotos } from '../../redux/slices/photos'
import { closePopup } from '../../redux/slices/popup'
import { deactivateSelectionMode } from '../../redux/slices/selectionMode'

const DeletePhotos = (): ReactElement => {
    const dispatch = useAppDispatch()

    const handleDeleteClick = async () => {
        try {
            await dispatch(fetchDeletePhotos()).unwrap()

            dispatch(deactivateSelectionMode())

            closePopup(dispatch)
        } catch (e) {
            alert('Не вдалось видалити фото')
        }
    }

    const handleBackClick = () => {
        closePopup(dispatch)
    }

    return (
        <div className="popup">
            <p className="popup__text">Видалити обрані фотографії?</p>
            <div className="popup__btn-group">
                <div onClick={handleBackClick}>
                    <RoundedButton style="light" text="Назад" />
                </div>
                <div onClick={handleDeleteClick}>
                    <RoundedButton style="dark" text="Видалити" type="submit" />
                </div>
            </div>
        </div>
    )
}

export default DeletePhotos
