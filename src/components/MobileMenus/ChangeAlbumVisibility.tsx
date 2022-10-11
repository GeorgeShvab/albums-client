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
import MobileMenuItem from './MobileMenuItem'

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
            <ul className="mobile-menu__list">
                <li onClick={handleBackClick}>
                    <MobileMenuItem children={<RoundedButton text="Назад" />} />
                </li>
                <li onClick={handleChangeVisibilityClick}>
                    <MobileMenuItem
                        children={
                            <RoundedButton text="Перетворити" style="dark" />
                        }
                    />
                </li>
            </ul>
        </div>
    )
}

export default ChangeAlbumVisibility
