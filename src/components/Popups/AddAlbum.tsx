import { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchAddAlbum, getAlbums } from '../../redux/slices/albums'
import { closePopup } from '../../redux/slices/popup'
import { AddAlbumFormEvent } from '../../types'
import Input from '../Input'
import RoundedButton from '../RoundedButton'

const AddAlbum = (): ReactElement => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [errors, setErrors] = useState<any[]>([])

    const userAlbums = useAppSelector(getAlbums)

    const handleBackClick = () => {
        closePopup(dispatch)
    }

    const handleInput = () => {
        if (!errors.length) return
        setErrors([])
    }

    const handleSubmit = async (e: AddAlbumFormEvent) => {
        try {
            e.preventDefault()

            const name = e.target.name.value.trim()

            if (!name) {
                setErrors([{ msg: 'Поле повинно бути заповнено' }])
                return
            }

            if (userAlbums?.find((item) => item.name === name)) {
                setErrors([{ msg: 'Ви вже маєте альбом з назвою ' + name }])
                return
            }

            const data = await dispatch(fetchAddAlbum(name))

            if (!data.payload.success) {
                setErrors(data.payload.errors)
            } else {
                closePopup(dispatch)
                navigate('/albums')
            }
        } catch (e) {
            setErrors([
                {
                    msg: "Немає з'єднання з сервером, будь ласка, спробуйте ще раз пізніше",
                },
            ])
        }
    }

    return (
        <div className="popup">
            <p className="popup__text">Введіть назву новоого альбому</p>
            <form onSubmit={handleSubmit}>
                <div className="popup__input-group">
                    <Input
                        name="name"
                        onInput={handleInput}
                        defaultValue=""
                        placeholder="Назва нового альбому"
                        max={100}
                    />
                </div>
                <div className="form__error">
                    <div className="form__error-container">
                        <div>
                            <p className="error">
                                {errors.length ? errors[0].msg : ''}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="popup__btn-group">
                    <div onClick={handleBackClick}>
                        <RoundedButton style="light" text="Назад" />
                    </div>
                    <div>
                        <RoundedButton
                            style="dark"
                            text="Створити"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddAlbum

/* <form
                action=""
                className="form add-album-form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <div className="form__item">
                    <input
                        type="text"
                        className={`form__input${
                            errors.length ? ' _error' : ''
                        }`}
                        name="name"
                        autoComplete="off"
                        placeholder="Ім'я альбому"
                        onInput={handleInput}
                        spellCheck={false}
                        defaultValue={defaultName}
                    />
                </div>
                <div className="form__item">
                    <label>
                        <div className="form__checkbox-container">
                            <input type="checkbox" hidden name="visibility" />
                            <span></span>
                            <p className="form__checkbox">Приватний альбом</p>
                        </div>
                    </label>
                </div>
                <div className="form__error">
                    <div className="form__error-container">
                        <div>
                            <p className="error">
                                {errors.length ? errors[0].msg : ''}
                            </p>
                        </div>
                    </div>
                </div>
                <ul className="mobile-menu__list _rounded-buttons">
                    <li onClick={hanldeBackClick}>
                        <MobileMenuItem
                            children={
                                <RoundedButton text="Назад" style="dark" />
                            }
                        />
                    </li>
                    <li>
                        <MobileMenuItem
                            children={
                                <RoundedButton
                                    text="Створити альбом"
                                    type="submit"
                                />
                            }
                        />
                    </li>
                </ul>
            </form> */
