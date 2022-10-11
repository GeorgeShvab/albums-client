import { ReactElement, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { getAlbums, fetchChangeName } from '../../redux/slices/albums'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'
import { AddAlbumFormEvent } from '../../types'
import RoundedButton from '../RoundedButton'
import MobileMenuItem from './MobileMenuItem'

const ChangeAlbumName = (): ReactElement => {
    const menuState = useAppSelector(getMobileMenuState)
    const dispatch = useAppDispatch()
    const mobileMenuEl = useRef<HTMLDivElement>(null)
    const [errors, setErrors] = useState<any[]>([])

    const userAlbums = useAppSelector(getAlbums)

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    useOutsideClick(mobileMenuEl, handleOutsideClick, [
        'context-menu',
        'album-heading__item',
    ])

    const handleInput = () => {
        if (!errors.length) return
        setErrors([])
    }

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
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
                fetchChangeName({
                    name: name,
                    albumId: menuState.data.album._id,
                })
            )

            if (!data.payload.success) {
                setErrors(data.payload.errors)
            } else {
                dispatch(hideOverlay())
                dispatch(hideMobileMenu())
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
        <div className="mobile-menu" ref={mobileMenuEl}>
            <form className="form" onSubmit={handleSubmit}>
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
                <ul className="mobile-menu__list">
                    <li onClick={handleBackClick}>
                        <MobileMenuItem
                            children={
                                <RoundedButton text="Назад" type="button" />
                            }
                        />
                    </li>
                    <li>
                        <MobileMenuItem
                            children={
                                <RoundedButton
                                    text="Змінити назву"
                                    style="dark"
                                    type="submit"
                                />
                            }
                        />
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default ChangeAlbumName
