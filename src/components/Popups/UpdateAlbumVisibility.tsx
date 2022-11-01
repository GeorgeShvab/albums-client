import { ReactElement } from 'react'
import { RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchChangeVisibility } from '../../redux/slices/albums'
import { hideMobileMenu } from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import { closePopup, getPopupState } from '../../redux/slices/popup'

const UpdateAlbumVisibility = (): ReactElement => {
    const dispatch = useAppDispatch()

    const popupState = useAppSelector(getPopupState)

    const handleBackClick = () => {
        closePopup(dispatch)
    }

    const handleUpdateVisibilityClick = async () => {
        try {
            const data = await dispatch(
                fetchChangeVisibility({
                    albumId: popupState.data.album._id,
                    visibility:
                        popupState.data.album.visibility === 'public'
                            ? 'private'
                            : 'public',
                })
            )

            if (!data.payload.success) {
                throw new Error()
            }

            closePopup(dispatch)
        } catch (e) {
            alert('Помилка при зміні видимості')
        }
    }

    return (
        <div className="popup">
            <p className="popup__text">
                Перевторити альбом {popupState.data.album.name} на{' '}
                {popupState.data.album.visibility === 'private'
                    ? 'публічний'
                    : 'приватний'}{' '}
                альбом?
            </p>
            <div className="popup__btn-group">
                <div onClick={handleBackClick}>
                    <RoundedButton style="light" text="Назад" />
                </div>
                <div onClick={handleUpdateVisibilityClick}>
                    <RoundedButton
                        style="dark"
                        text="Перетворити"
                        type="submit"
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdateAlbumVisibility
