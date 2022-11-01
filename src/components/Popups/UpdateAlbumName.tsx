import { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchChangeName } from '../../redux/slices/albums'
import { getPopupState, closePopup } from '../../redux/slices/popup'
import { PopupFormEvent } from '../../types'
import Input from '../Input'
import RoundedButton from '../RoundedButton'

const UpdateAlbumName = (): ReactElement => {
    const dispatch = useAppDispatch()

    const popupState = useAppSelector(getPopupState)

    const handleSubmit = (e: PopupFormEvent) => {
        e.preventDefault()
        dispatch(
            fetchChangeName({
                albumId: popupState.data.album._id,
                name: e.target.name.value,
            })
        )

        closePopup(dispatch)
    }

    const handleBackClick = () => {
        closePopup(dispatch)
    }

    return (
        <div className="popup">
            <p className="popup__text">
                Введіть нове ім'я альбому {popupState.data.album.name}
            </p>
            <form onSubmit={handleSubmit}>
                <div className="popup__input-group">
                    <Input
                        name="name"
                        onInput={() => {}}
                        defaultValue=""
                        placeholder="Нове ім'я"
                        max={100}
                    />
                </div>
                <div className="popup__btn-group">
                    <div onClick={handleBackClick}>
                        <RoundedButton style="light" text="Назад" />
                    </div>
                    <div>
                        <RoundedButton
                            style="dark"
                            text="Змінити"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateAlbumName
