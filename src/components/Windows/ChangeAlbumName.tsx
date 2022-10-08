import { ReactElement, useRef, useState } from 'react'
import { RoundedButton } from '../'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { getAlbums, fetchChangeName } from '../../redux/slices/albums'
import { hideOverlay } from '../../redux/slices/overlay'
import { getWindowState, hideWindow } from '../../redux/slices/window'
import { AddAlbumFormEvent } from '../../types'

const ChangeAlbumName = (): ReactElement => {
    const window = useAppSelector(getWindowState)
    const dispatch = useAppDispatch()
    const windowEl = useRef(null)
    const [errors, setErrors] = useState<any[]>([])

    const userAlbums = useAppSelector(getAlbums)

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideWindow())
    }

    useOutsideClick(windowEl, handleOutsideClick, [
        'context-menu',
        'album-heading__item',
    ])

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

            const data = await dispatch(
                fetchChangeName({ name: name, albumId: window.data.album._id })
            )

            if (!data.payload.success) {
                setErrors(data.payload.errors)
            } else {
                dispatch(hideOverlay())
                dispatch(hideWindow())
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
            <form className="form add-album-form" onSubmit={handleSubmit}>
                <div className="form__item">
                    <input
                        type="text"
                        className={`form__input${
                            errors.length ? ' _error' : ''
                        }`}
                        name="name"
                        autoComplete="off"
                        placeholder="Нова назва"
                        onInput={handleInput}
                        spellCheck={false}
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
                <div className="form__submit buttons-container">
                    <div>
                        <RoundedButton text="Назад" type="button" />
                    </div>
                    <div>
                        <RoundedButton
                            text="Змінити назву"
                            style="dark"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChangeAlbumName
