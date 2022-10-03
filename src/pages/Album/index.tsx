import { ReactElement, useEffect, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import {
    AlbumHeading,
    AlbumHeadingLoader,
    DotsMenu,
    Error,
    FullScreenPhoto,
    Photo,
    PhotoLoader,
    Title,
} from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { cleanAlbumState, fetchAlbum, getAlbum } from '../../redux/slices/album'
import { getUser } from '../../redux/slices/auth'
import { isMobile } from '../../redux/slices/device'
import { showMobileMenu } from '../../redux/slices/mobileMenu'
import { showOverlay } from '../../redux/slices/overlay'
import { setPage } from '../../redux/slices/page'
import {
    cleanPhotosState,
    fetchPhotos,
    getPhotos,
} from '../../redux/slices/photos'
import { showWindow } from '../../redux/slices/window'
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

const Album = (): ReactElement => {
    const photos = useAppSelector(getPhotos)
    const album = useAppSelector(getAlbum)
    const user = useAppSelector(getUser)
    const mobile = useAppSelector(isMobile)
    const selectionMode = useAppSelector(isSelectionMode)

    const dispatch = useAppDispatch()
    const params = useParams()

    const [error, setError] = useState<{
        type: 'UNEXPECTED' | 'NOT_FOUND' | 'FORBIDDEN' | 'EMPTY'
        text: string
    } | null>(null)

    useEffect(() => {
        if (photos && !photos.length)
            setError({ type: 'EMPTY', text: 'Альбом пустий' })
    }, [photos])

    useEffect(() => {
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

    let errorText: string = ''
    let errorImg: ReactElement = <svg></svg>

    if (error?.type === 'NOT_FOUND') {
        errorText = 'Альбом не знайдено'
        errorImg = NotFoundError
    } else if (error?.type === 'EMPTY') {
        errorText = 'Альбом пустий'
        errorImg = Empty
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
                    {photos
                        ? photos.map((item) => (
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
                        : new Array(50)
                              .fill(null)
                              .map((item, index) => (
                                  <PhotoLoader key={index} />
                              ))}
                </div>
            </div>
        </>
    )
}

export default Album
