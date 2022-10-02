import { ReactElement, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { getMobileMenuState } from '../../../redux/slices/mobileMenu'
import useOutsideClick from '../../../hooks/useOutsideClick'
import { hideOverlay, showOverlay } from '../../../redux/slices/overlay'
import {
    hideMobileMenu,
    showMobileMenu,
} from '../../../redux/slices/mobileMenu'
import { AddAlbumFormEvent } from '../../../types'
import { useNavigate } from 'react-router-dom'
import { fetchAddAlbum, getAlbums } from '../../../redux/slices/albums'
import { RoundedButton } from '../..'
import getNewAlbumName from '../../../utils/getNewAlbumName'

const AddAlbumMenu = (): ReactElement => {
    const dispatch = useAppDispatch()
    const menuState = useAppSelector(getMobileMenuState)
    const mobileMenuEl = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    const userAlbums = useAppSelector(getAlbums)

    const [errors, setErrors] = useState<any[]>([])

    const [defaultName, setDefaultName] = useState<string>('')

    useEffect(() => {
        if (userAlbums) setDefaultName(getNewAlbumName(userAlbums))
    }, [userAlbums])

    const outsideClickFunc = () => {
        if (menuState.type !== 'add-album' || !menuState.state) return

        dispatch(hideMobileMenu())
        dispatch(hideOverlay())
    }

    useOutsideClick(mobileMenuEl, outsideClickFunc, ['mobile-menu'])

    if (menuState.type !== 'add-album' || !menuState.state) return <></>

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
                dispatch(hideMobileMenu())
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
        <div
            className={`mobile-menu${
                menuState.type === 'add-album' && menuState.state
                    ? ' _show'
                    : ''
            }`}
            ref={mobileMenuEl}
        >
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

export default AddAlbumMenu
