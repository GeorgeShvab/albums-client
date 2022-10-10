import { ReactElement, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { authorized } from '../../redux/slices/auth'
import { showOverlay } from '../../redux/slices/overlay'
import { showWindow } from '../../redux/slices/window'
import ContextMenu from '../ContextMenu'
import NavItem from './NavItem'

const Nav = (): ReactElement => {
    const isAuthorized = useAppSelector(authorized)

    const [addingMenuState, setAddingMenuState] = useState(false)

    const addBtnEl = useRef<HTMLLIElement>(null)

    const dispatch = useAppDispatch()

    const hadnleAddClick = () => {
        setAddingMenuState((prev) => !prev)
    }

    const handleAddAlbumClick = () => {
        dispatch(showOverlay())
        dispatch(showWindow('add-album'))
    }

    const handleOutsideClick = () => {
        setAddingMenuState(false)
    }

    const handleAddPhotoClick = () => {
        dispatch(showOverlay())
        dispatch(showWindow('add-photo'))
    }

    useOutsideClick(addBtnEl, handleOutsideClick, ['context-menu'])

    const contextMenuElements: { func: () => void; text: string }[] = [
        {
            func: handleAddPhotoClick,
            text: 'Додати фото',
        },
        {
            func: handleAddAlbumClick,
            text: 'Додати альбом',
        },
    ]
    const contextMenuStyle = {
        top: '130%',
        left: '50%',
        transform: 'translateX(-50%)',
    }

    const addBtnSvg = (
        <svg
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14 1.75V27.75"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1 14.75H27"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )

    return isAuthorized ? (
        <nav className="nav">
            <ul className="nav__list">
                <li
                    onClick={hadnleAddClick}
                    ref={addBtnEl}
                    className="circle-btn"
                    style={{ position: 'relative', marginRight: '15px' }}
                >
                    <NavItem children={addBtnSvg} />
                    {addingMenuState ? (
                        <ContextMenu
                            elements={contextMenuElements}
                            style={contextMenuStyle}
                            arrow={true}
                        />
                    ) : (
                        ''
                    )}
                </li>
                <li>
                    <NavItem children="Головна" link="/home" />
                </li>
                <li>
                    <NavItem children="Альбоми" link="/albums" />
                </li>
            </ul>
        </nav>
    ) : (
        <nav className="nav">
            <ul className="nav__list fixed-size-btns">
                <li>
                    <NavItem children="Головна" link="/albums" />
                </li>
                <li>
                    <NavItem
                        children="Реєстрація"
                        link="/albums"
                        style="outline black"
                    />
                </li>
                <li>
                    <NavItem
                        children="Вхід"
                        link="/albums"
                        style="outline white"
                    />
                </li>
            </ul>
        </nav>
    )
}

export default Nav
