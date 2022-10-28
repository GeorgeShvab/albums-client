import { FormEvent, ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchUpdateDescription } from '../../redux/slices/albums'
import { closePopup, getPopupState } from '../../redux/slices/popup'
import { PopupFormEvent } from '../../types'
import Input from '../Input'
import RoundedButton from '../RoundedButton'
import './style.scss'

const UpdateAlbumDescription = (): ReactElement => {
    const dispatch = useAppDispatch()

    const popupState = useAppSelector(getPopupState)

    const handleSubmit = (e: PopupFormEvent) => {
        e.preventDefault()
        dispatch(
            fetchUpdateDescription({
                albumId: popupState.data.album._id,
                description: e.target.description.value,
            })
        )

        closePopup(dispatch)
    }

    return (
        <div className="popup">
            <p className="popup__text">
                Введіть опис альбому {popupState.data.album.name}
            </p>
            <form onSubmit={handleSubmit}>
                <div className="popup__input-group">
                    <Input
                        name="description"
                        onInput={() => {}}
                        defaultValue={popupState.data.album.description}
                        placeholder={''}
                        max={100}
                    />
                </div>
                <div className="popup__btn-group">
                    <RoundedButton style="light" text="Назад" />
                    <RoundedButton style="dark" text="Змінити" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default UpdateAlbumDescription
