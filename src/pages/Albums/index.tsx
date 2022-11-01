import { ReactElement, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Album, AlbumLoader, Error } from '../../components'
import { Empty, UnexpectedError } from '../../components/Svgs'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    fetchAlbums,
    getAlbums,
    getAlbumsState,
} from '../../redux/slices/albums'
import { getUser, isAuthorized } from '../../redux/slices/auth'
import { isMobile } from '../../redux/slices/device'
import { showMobileMenu } from '../../redux/slices/mobileMenu'
import { showOverlay } from '../../redux/slices/overlay'
import { setPage } from '../../redux/slices/page'
import { showPopup } from '../../redux/slices/popup'
import { showWindow } from '../../redux/slices/window'
import throttle from '../../utils/thorttle'
import './style.scss'

const Albums = (): ReactElement => {
    const albums = useAppSelector(getAlbums)
    const albumsState = useAppSelector(getAlbumsState)
    const dispatch = useAppDispatch()
    const mobile = useAppSelector(isMobile)
    const user = useAppSelector(getUser)

    useEffect(() => {
        dispatch(setPage('albums'))
        document.title = 'Ваші альбоми'

        window.scrollTo(0, 0)
    }, [])

    if (!localStorage.getItem('Authorization'))
        return <Navigate to="/login"></Navigate>

    const handleAddAlbumClick = () => {
        showPopup({ dispatch, type: 'add-album' })
    }

    const emptyErrorText = 'Ви не маєте альбомів, натисніть щоб створити новий'
    const someErrorText = 'Сталась неочікувана помилка'

    // Якщо у користувача немає альбомів
    if (albums?.length === 0) {
        return (
            <div className="albums">
                <div className="albums__container">
                    <div onClick={handleAddAlbumClick} className="_pointer">
                        <Error
                            style={{ top: '60%' }}
                            imageEl={Empty}
                            text={emptyErrorText}
                        />
                    </div>
                </div>
            </div>
        )
    }

    // Якщо інша помилка
    if (albumsState.status === 'error' || user.status === 'error') {
        return (
            <div className="albums">
                <div className="albums__container">
                    <Error
                        style={{ top: '60%' }}
                        imageEl={UnexpectedError}
                        text={someErrorText}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="albums">
            <div className="albums__container">
                {albums
                    ? albums?.map((item, index) => (
                          <Album
                              {...item}
                              key={item._id}
                              authorAuthorized={
                                  user.data?._id === item.creator._id &&
                                  user.data
                                      ? true
                                      : false
                              }
                          />
                      ))
                    : new Array(10)
                          .fill(null)
                          .map((item, index) => <AlbumLoader key={index} />)}
            </div>
        </div>
    )
}

export default Albums
