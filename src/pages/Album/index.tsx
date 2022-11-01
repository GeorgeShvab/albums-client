import { ReactElement, useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import {
    AlbumHeading,
    Error,
    FullScreenPhoto,
    Photo,
    SimpleLoader,
} from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { cleanAlbumState, fetchAlbum, getAlbum } from '../../redux/slices/album'
import { getUser } from '../../redux/slices/auth'
import { setPage } from '../../redux/slices/page'
import {
    cleanPhotosState,
    fetchPhotos,
    getPhotos,
    getPhotosState,
} from '../../redux/slices/photos'
import './style.scss'
import {
    UnexpectedError,
    NotFoundError,
    Empty,
    ForbiddenError,
} from '../../components/Svgs'
import {
    deactivateSelectionMode,
    isSelectionMode,
} from '../../redux/slices/selectionMode'
import throttle from '../../utils/thorttle'

const Album = (): ReactElement => {
    const photos = useAppSelector(getPhotos)
    const photosState = useAppSelector(getPhotosState)
    const album = useAppSelector(getAlbum)
    const user = useAppSelector(getUser)
    const selectionMode = useAppSelector(isSelectionMode)

    const dispatch = useAppDispatch()
    const params = useParams()

    const [error, setError] = useState<{
        type: 'UNEXPECTED' | 'NOT_FOUND' | 'FORBIDDEN'
        text: string
    } | null>(null)

    const handleScroll = (e: Event) => {
        if (album?.count === photos?.length || album?.count === 0) {
            return
        }
        if (
            window.scrollY + window.innerHeight + 400 >
                document.documentElement.offsetHeight &&
            album
        ) {
            dispatch(fetchPhotos(album._id))
        }
    }

    const handleScrollThrottle = throttle(handleScroll, 250)

    useEffect(() => {
        window.addEventListener('scroll', handleScrollThrottle)

        return () => {
            window.removeEventListener('scroll', handleScrollThrottle)
        }
    }, [album, photos])

    useEffect(() => {
        if (album) {
            document.title = album.name
        } else if (error && !album) {
            document.title = 'Помилка'
        } else {
            document.title = 'Альбом'
        }
    }, [album, error])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [photosState.status])

    useEffect(() => {
        window.scrollTo(0, 0)

        dispatch(setPage('album'))
        ;(async () => {
            if (params.albumId) {
                try {
                    dispatch(fetchPhotos(params.albumId)).unwrap()
                    await dispatch(fetchAlbum(params.albumId)).unwrap()
                    if (error) setError(null)
                } catch (e: any) {
                    if (/ 404$/.test(e.message)) {
                        setError({
                            type: 'NOT_FOUND',
                            text: 'Альбом не знайдено',
                        })
                    } else if (/ 403$/.test(e.message)) {
                        setError({
                            type: 'FORBIDDEN',
                            text: 'Альбом приватний, тільки власник має доступ до нього',
                        })
                    } else {
                        setError({
                            type: 'UNEXPECTED',
                            text: 'Сталась помилка',
                        })
                    }
                }
            }
        })()

        return () => {
            dispatch(cleanPhotosState())
            dispatch(cleanAlbumState())
            dispatch(deactivateSelectionMode())
        }
    }, [])

    const emptyErrorText = 'Цей альбом пустий'

    let errorText: string = ''
    let errorImg: ReactElement = <svg></svg>

    if (error?.type === 'NOT_FOUND') {
        errorText = 'Альбом не знайдено'
        errorImg = NotFoundError
    } else if (error?.type === 'FORBIDDEN') {
        errorText = 'Альбом приватний, отже доступний тільки власнику'
        errorImg = ForbiddenError
    } else if (error?.type === 'UNEXPECTED') {
        errorText = 'Сталась неочікувана помилка'
        errorImg = UnexpectedError
    }

    // Якщо помилка
    if (error)
        return (
            <div className="album-page">
                <Error
                    style={
                        album?.creator._id === user.data?._id &&
                        user.data &&
                        album
                            ? { top: '60%' }
                            : {}
                    }
                    imageEl={errorImg}
                    text={errorText}
                />
            </div>
        )

    // Якщо пустий
    if (photos?.length === 0) {
        return (
            <>
                <Routes>
                    <Route path="/:photoId" element={<FullScreenPhoto />} />
                </Routes>
                <div className="album-page">
                    <AlbumHeading user={user.data} album={album} />
                    <Error
                        style={{ top: '60%' }}
                        imageEl={Empty}
                        text={emptyErrorText}
                    />
                </div>
            </>
        )
    }

    //по дефолту
    return (
        <>
            <Routes>
                <Route path="/:photoId" element={<FullScreenPhoto />} />
            </Routes>
            <div className="album-page">
                <AlbumHeading user={user.data} album={album} />

                <div
                    className={`album-page__container${
                        selectionMode.state ? ' _selection-mode' : ''
                    }`}
                >
                    {photos && album ? (
                        photos.map((item) => (
                            <Photo
                                selectionMode={selectionMode.state}
                                {...item}
                                key={item._id}
                                selected={selectionMode.selected.includes(
                                    item._id
                                )}
                                isAuthor={
                                    album?.creator._id === user.data?._id &&
                                    album &&
                                    user.data
                                        ? true
                                        : false
                                }
                            />
                        ))
                    ) : (
                        <SimpleLoader />
                    )}
                </div>
            </div>
        </>
    )
}

export default Album
