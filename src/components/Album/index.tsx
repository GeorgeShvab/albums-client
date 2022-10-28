import { ReactElement, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ContextMenuWrapper } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchDeleteAlbum } from '../../redux/slices/albums'
import { isAuthorized } from '../../redux/slices/auth'
import { isMobile } from '../../redux/slices/device'
import { showMobileMenu } from '../../redux/slices/mobileMenu'
import { showOverlay } from '../../redux/slices/overlay'
import { showWindow } from '../../redux/slices/window'
import * as types from '../../types'
import ContextMenu from '../ContextMenu'
import DotsMenu from '../DotsMenu'
import AlbumSettings from './AlbumSettings'
import SaveAlbum from './SaveAlbum'
import './style.scss'

const Album = (
    props: types.Album & { authorAuthorized?: boolean }
): ReactElement => {
    let imgLink: string =
        process.env.REACT_APP_SERVER_ADDRESS +
        '/static/system/default_album_background.jpg'

    const authorized = useAppSelector(isAuthorized)

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
            {props.authorAuthorized ? (
                <AlbumSettings {...props} />
            ) : authorized ? (
                <SaveAlbum albumId={props._id} saved={props.saved} />
            ) : (
                ''
            )}
        </div>
    )
}

export default Album
