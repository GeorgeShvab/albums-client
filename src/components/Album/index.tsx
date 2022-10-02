import { ReactElement, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchDeleteAlbum } from '../../redux/slices/albums'
import { isMobile } from '../../redux/slices/device'
import { showMobileMenu } from '../../redux/slices/mobileMenu'
import { showOverlay } from '../../redux/slices/overlay'
import { showWindow } from '../../redux/slices/window'
import * as types from '../../types'
import DotsMenu from '../DotsMenu'
import './style.scss'

const Album = (props: types.Album): ReactElement => {
    const dispatch = useAppDispatch()

    let imgLink: string =
        process.env.REACT_APP_SERVER_ADDRESS +
        '/static/system/default_album_background.jpg'

    const mobile = useAppSelector(isMobile)

    if (props.background) {
        imgLink =
            process.env.REACT_APP_SERVER_ADDRESS +
            '/static' +
            '/backgrounds/' +
            props._id +
            '/' +
            props.background
    } else if (props.last_photo) {
        imgLink =
            process.env.REACT_APP_SERVER_ADDRESS +
            '/static' +
            '/photos/' +
            props.last_photo.uploader +
            '/' +
            props.last_photo.name
    }

    const deleteAlbum = (): void => {
        dispatch(showOverlay())
        if (mobile) {
            dispatch(
                showMobileMenu({ type: 'delete-album', data: { album: props } })
            )
            return
        }
        dispatch(showWindow({ type: 'delete-album', data: { album: props } }))
    }

    const changeVisibility = (): void => {
        dispatch(showOverlay())
        if (mobile) {
            dispatch(
                showMobileMenu({
                    type: 'change-album-visibility',
                    data: { album: props },
                })
            )
            return
        }
        dispatch(
            showWindow({
                type: 'change-album-visibility',
                data: { album: props },
            })
        )
    }

    const changeName = (): void => {
        dispatch(showOverlay())
        if (mobile) {
            dispatch(
                showMobileMenu({
                    type: 'change-album-name',
                    data: { album: props },
                })
            )
            return
        }
        dispatch(
            showWindow({ type: 'change-album-name', data: { album: props } })
        )
    }

    const changePreview = () => {
        dispatch(showOverlay())
        if (mobile) {
            dispatch(
                showMobileMenu({
                    type: 'change-album-preview',
                    data: { album: props },
                })
            )
            return
        }
        dispatch(
            showWindow({ type: 'change-album-preview', data: { album: props } })
        )
    }

    const contextMenuElements = [
        {
            text: 'Видалити альбом',
            func: deleteAlbum,
        },
        {
            text: 'Змінити превью альбому',
            func: changePreview,
        },
        {
            text: 'Змінити назву альбому',
            func: changeName,
        },
        {
            text: 'Змінити видимість альбому',
            func: changeVisibility,
        },
    ]

    return (
        <div
            className="album"
            style={{ backgroundImage: `url(${encodeURI(imgLink)})` }}
        >
            <Link to={`/albums/${props._id}`}>
                <div className="album__content">
                    <h2 className="album__title">{props.name}</h2>
                    <p className="album__count">{props.count + ' фото'}</p>
                </div>
            </Link>
            <DotsMenu
                style={{ top: '20px', right: mobile ? '12.5px' : '17.5px' }}
                contextMenuElements={contextMenuElements}
                contextMenuStyle={{
                    top: mobile ? '-7px' : '0',
                    right: '0',
                    transform: 'none',
                }}
            />
        </div>
    )
}

export default Album
