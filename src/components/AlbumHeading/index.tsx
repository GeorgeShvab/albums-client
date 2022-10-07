import { memo, ReactElement } from 'react'
import {
    AlbumHeadingLoader,
    AlbumHeadingLoaderMobile,
    DotsMenu,
    RoundedButton,
    Title,
} from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    activateSelectionMode,
    deactivateSelectionMode,
    isSelectionMode,
} from '../../redux/slices/selectionMode'
import { isMobile } from '../../redux/slices/device'
import { showMobileMenu } from '../../redux/slices/mobileMenu'
import { showOverlay } from '../../redux/slices/overlay'
import { showWindow } from '../../redux/slices/window'
import { Album, User } from '../../types'
import './style.scss'

const AlbumHeading = memo(
    ({
        album,
        user,
    }: {
        album: Album | null
        user: User | null
    }): ReactElement => {
        const mobile = useAppSelector(isMobile)
        const selectionMode = useAppSelector(isSelectionMode)

        const dispatch = useAppDispatch()

        const deleteAlbum = (): void => {
            dispatch(showOverlay())
            if (mobile) {
                dispatch(
                    showMobileMenu({
                        type: 'delete-album',
                        data: { album: album },
                    })
                )
                return
            }
            dispatch(
                showWindow({ type: 'delete-album', data: { album: album } })
            )
        }

        const changeVisibility = (): void => {
            dispatch(showOverlay())
            if (mobile) {
                dispatch(
                    showMobileMenu({
                        type: 'change-album-visibility',
                        data: { album: album },
                    })
                )
                return
            }
            dispatch(
                showWindow({
                    type: 'change-album-visibility',
                    data: { album: album },
                })
            )
        }

        const changeName = (): void => {
            dispatch(showOverlay())
            if (mobile) {
                dispatch(
                    showMobileMenu({
                        type: 'change-album-name',
                        data: { album: album },
                    })
                )
                return
            }
            dispatch(
                showWindow({
                    type: 'change-album-name',
                    data: { album: album },
                })
            )
        }

        const selectPhotos = () => {
            if (selectionMode.state) {
                dispatch(deactivateSelectionMode())
                return
            }
            dispatch(activateSelectionMode())
        }

        const contextMenuElements = [
            {
                text: 'Видалити альбом',
                func: deleteAlbum,
            },
            {
                text: selectionMode.state
                    ? 'Відмінити обирання'
                    : 'Обрати фото',
                func: selectPhotos,
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

        const handleCancelClick = () => {
            dispatch(deactivateSelectionMode())
        }

        const handleDeleteClick = async () => {
            dispatch(showOverlay())
            if (mobile) {
                dispatch(showMobileMenu('delete-photos'))
                return
            }

            dispatch(showWindow('delete-photos'))
        }

        const handleMoveClick = () => {
            dispatch(showOverlay())
            if (mobile) {
                dispatch(showMobileMenu('move-photos'))
                return
            }
            dispatch(showWindow('move-photos'))
        }

        return (
            <div className="album-page__heading">
                {album ? (
                    <>
                        <div className="album-page__heading-title">
                            <div className="album-page__heading-container">
                                <Title text={album?.name || '  '} />
                                {user?._id === album?.creator._id &&
                                user &&
                                album ? (
                                    <DotsMenu
                                        contextMenuElements={
                                            contextMenuElements
                                        }
                                        contextMenuStyle={
                                            mobile
                                                ? {
                                                      top: '110%',
                                                      right: '0',
                                                      transform: 'none',
                                                  }
                                                : {
                                                      top: '110%',
                                                  }
                                        }
                                        hideContextMenuOnOutsideHover={true}
                                        style={{
                                            position: 'absolute',
                                            left: '110%',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                        }}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        {(!selectionMode.state || mobile) && album ? (
                            <div className="album-page__heading-data">
                                <p className="album-page__heading-count">
                                    {album?.count + ' фото'}
                                </p>
                                <p className="album-page__heading-author">
                                    {'Автор: ' + album?.creator.name}
                                </p>
                            </div>
                        ) : (
                            ''
                        )}
                        {selectionMode.state && !mobile ? (
                            <div className="album-page__heading-selection">
                                <button
                                    className="album-page__heading-btn"
                                    onClick={handleDeleteClick}
                                >
                                    Видалити
                                </button>
                                <button
                                    className="album-page__heading-btn"
                                    onClick={handleMoveClick}
                                >
                                    Перемістити
                                </button>
                                <button
                                    className="album-page__heading-btn"
                                    onClick={handleCancelClick}
                                >
                                    Відмінити
                                </button>
                            </div>
                        ) : (
                            ''
                        )}
                    </>
                ) : (
                    <div className="album-page__heading-loader">
                        {mobile ? (
                            <AlbumHeadingLoaderMobile />
                        ) : (
                            <AlbumHeadingLoader />
                        )}
                    </div>
                )}
            </div>
        )
    }
)

export default AlbumHeading
