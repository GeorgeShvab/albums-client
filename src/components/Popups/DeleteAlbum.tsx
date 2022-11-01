import { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchDeleteAlbum } from '../../redux/slices/albums'
import { hideMobileMenu } from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import { closePopup, getPopupState } from '../../redux/slices/popup'
import Input from '../Input'
import RoundedButton from '../RoundedButton'

const DeleteAlbum = (): ReactElement => {
    const dispatch = useAppDispatch()

    const popupState = useAppSelector(getPopupState)

    const handleDeleteClick = async () => {
        try {
            const data = await dispatch(
                fetchDeleteAlbum(popupState.data.album._id)
            )

            if (!data.payload.success) {
                throw new Error()
            }

            closePopup(dispatch)
        } catch (e) {
            alert('Помилка при видаленні')
        }
    }

    const handleBackClick = () => {
        closePopup(dispatch)
    }

    return (
        <div className="popup">
            <p className="popup__text">
                Безповоротно видалити альбом {popupState.data.album.name}?
            </p>
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

export default DeleteAlbum
