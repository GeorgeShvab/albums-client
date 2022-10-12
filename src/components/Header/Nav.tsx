import { ReactElement, useRef, useState } from 'react'
import { Avatar, ContextMenuWrapper } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { authorized, getUser } from '../../redux/slices/auth'
import { showOverlay } from '../../redux/slices/overlay'
import { showWindow } from '../../redux/slices/window'
import ContextMenu from '../ContextMenu'
import NavItem from './NavItem'
import defaultAvatar from '../../static/default-avatar.jpg'

const Nav = (): ReactElement => {
    const isAuthorized = useAppSelector(authorized)
    const user = useAppSelector(getUser)

    const addBtnEl = useRef<HTMLLIElement>(null)

    const dispatch = useAppDispatch()

    const handleAddAlbumClick = () => {
        dispatch(showOverlay())
        dispatch(showWindow('add-album'))
    }

    const handleAddPhotoClick = () => {
        dispatch(showOverlay())
        dispatch(showWindow('add-photo'))
    }

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

    // Svg хрест на кнопці
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

    if (isAuthorized) {
        return (
            <nav className="nav">
                <ul className="nav__list">
                    <li
                        ref={addBtnEl}
                        className="circle-btn"
                        style={{ position: 'relative', marginRight: '15px' }}
                    >
                        <NavItem children={addBtnSvg} />
                        <ContextMenuWrapper refEl={addBtnEl} type="click">
                            <ContextMenu
                                elements={contextMenuElements}
                                style={contextMenuStyle}
                                arrow={true}
                            />
                        </ContextMenuWrapper>
                    </li>
                    <li>
                        <NavItem children="Головна" link="/home" />
                    </li>
                    <li>
                        <NavItem children="Альбоми" link="/albums" />
                    </li>
                    <li className="circle-btn" style={{ marginLeft: '10px' }}>
                        <NavItem
                            children={
                                <Avatar
                                    avatarUrl={
                                        user.data?.avatar
                                            ? `${process.env.REACT_APP_SERVER_ADDRESS}/static/avatars/${user.data?._id}/${user.data?.avatar}`
                                            : defaultAvatar
                                    }
                                />
                            }
                            link={'/' + user.data?._id}
                        />
                    </li>
                </ul>
            </nav>
        )
    } else {
        return (
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
}

export default Nav
