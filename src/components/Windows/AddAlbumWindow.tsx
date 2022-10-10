import { ReactElement, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { fetchAddAlbum, getAlbums } from '../../redux/slices/albums'
import { hideOverlay } from '../../redux/slices/overlay'
import { hideWindow } from '../../redux/slices/window'
import { AddAlbumFormEvent } from '../../types'
import getNewAlbumName from '../../utils/getNewAlbumName'

const AddAlbumWindow = (): ReactElement => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const windowEl = useRef(null)
    const [errors, setErrors] = useState<any[]>([])

    const userAlbums = useAppSelector(getAlbums)

    const [defaultName, setDefaultName] = useState<string>('')

    useEffect(() => {
        if (userAlbums) setDefaultName(getNewAlbumName(userAlbums))
    }, [userAlbums])

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    useOutsideClick(windowEl, handleOutsideClick, ['context-menu__item'])

    const handleInput = () => {
        if (!errors.length) return
        setErrors([])
    }

    const handleSubmit = async (e: AddAlbumFormEvent) => {
        try {
            e.preventDefault()

            const name = e.target.name.value.trim()
            const visibility =
                e.target.visibility.checked === true ? 'private' : 'public'

            if (!name) {
                setErrors([{ msg: 'Поле повинно бути заповнено' }])
                return
            }

            if (userAlbums?.find((item) => item.name === name)) {
                setErrors([{ msg: 'Ви вже маєте альбом з назвою ' + name }])
                return
            }

            const data = await dispatch(
                fetchAddAlbum({ name: name, visibility: visibility })
            )

            if (!data.payload.success) {
                setErrors(data.payload.errors)
            } else {
                dispatch(hideOverlay())
                dispatch(hideWindow())
                navigate('/albums')
            }
        } catch (e) {
            setErrors([
                {
                    msg: "Немає з'єднання з сервером, будь ласка, спробуйте ще рах пізніше",
                },
            ])
        }
    }

    return (
        <div className="window" ref={windowEl}>
            <form
                action=""
                className="form add-album-form"
                onSubmit={handleSubmit}
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
                <div className="form__submit">
                    <RoundedButton
                        text="Створити альбом"
                        style="dark"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default AddAlbumWindow
