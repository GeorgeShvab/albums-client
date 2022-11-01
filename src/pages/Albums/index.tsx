import { ReactElement, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Album, AlbumLoader, Error } from '../../components'
import { Empty, UnexpectedError } from '../../components/Svgs'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    fetchAlbums,
    getAlbums,
    getAlbumsState,
} from '../../redux/slices/albums'
import { getUser } from '../../redux/slices/auth'
import { setPage } from '../../redux/slices/page'
import { showPopup } from '../../redux/slices/popup'
import './style.scss'

const Albums = (): ReactElement => {
    const albums = useAppSelector(getAlbums)
    const albumsState = useAppSelector(getAlbumsState)
    const dispatch = useAppDispatch()
    const user = useAppSelector(getUser)

    useEffect(() => {
        dispatch(setPage('albums'))
        document.title = 'Ваші альбоми'

        if (user.data) {
            dispatch(fetchAlbums())
        }

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
