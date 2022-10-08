import { ReactElement, useRef } from 'react'
import { RoundedButton } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { fetchChangeVisibility } from '../../redux/slices/albums'
import {
    getMobileMenuState,
    hideMobileMenu,
} from '../../redux/slices/mobileMenu'
import { hideOverlay } from '../../redux/slices/overlay'

const ChangeAlbumVisibility = (): ReactElement => {
    const menuState = useAppSelector(getMobileMenuState)

    const dispatch = useAppDispatch()

    const mobileMenuEl = useRef<HTMLDivElement>(null)

    const handleOutsideClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    const handleBackClick = () => {
        dispatch(hideOverlay())
        dispatch(hideMobileMenu())
    }

    const handleChangeVisibilityClick = async () => {
        try {
            const data = await dispatch(
                fetchChangeVisibility({
                    albumId: menuState.data.album._id,
                    visibility:
                        menuState.data.album.visibility === 'public'
                            ? 'private'
                            : 'public',
                })
            )
            if (!data.payload.success) {
                alert('Помилка при зміні видимості')
                return
            }
            dispatch(hideOverlay())
            dispatch(hideMobileMenu())
        } catch (e) {
            alert('Помилка при зміні видимості')
        }
    }

    useOutsideClick(mobileMenuEl, handleOutsideClick, [
        'context-menu',
        'album-heading__item',
    ])

    return (
        <div className="mobile-menu" ref={mobileMenuEl}>
            <p className="mobile-menu__text">
                Перевторити{' '}
                <span className="highlited">{menuState.data.album.name}</span>{' '}
                на{' '}
                {menuState.data.album.visibility === 'private'
                    ? 'публічний'
                    : 'приватний'}{' '}
                альбом?
            </p>
            <div className="mobile-menu__buttons">
                <div className="mobile-menu__button" onClick={handleBackClick}>
                    <RoundedButton text="Назад" style="dark" />
                </div>
                <div
                    className="mobile-menu__button"
                    onClick={handleChangeVisibilityClick}
                >
                    <RoundedButton text="Перетворити" />
                </div>
            </div>
        </div>
    )
}

export default ChangeAlbumVisibility
