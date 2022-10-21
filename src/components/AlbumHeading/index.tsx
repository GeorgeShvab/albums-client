import { memo, ReactElement, useRef } from 'react'
import {
    AlbumHeadingLoader,
    AlbumHeadingLoaderMobile,
    Avatar,
    ContextMenu,
    ContextMenuWrapper,
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
import { Link } from 'react-router-dom'
import defaultAvatar from '../../static/default-avatar.jpg'

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

        const refEl = useRef<HTMLDivElement>(null)

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

        const dotsMenuStyle = {
            position: 'absolute',
            left: '110%',
            top: '50%',
            transform: 'translateY(-50%)',
        }

        const contextMenuStyle = mobile
            ? {
                  top: '110%',
                  right: '0',
                  transform: 'none',
              }
            : {
                  top: '130%',
                  left: '50%',
                  transform: 'translateX(-50%)',
              }

        if (!album) return <></>

        return (
            <div className="album-heading">
                <>
                    <div className="album-heading__title">
                        <div className="album-heading__container">
                            <Title text={album?.name || '  '} />
                            {user?._id === album?.creator._id &&
                            user &&
                            album ? (
                                <div ref={refEl}>
                                    <DotsMenu style={dotsMenuStyle}>
                                        <ContextMenuWrapper
                                            refEl={refEl}
                                            type="click"
                                        >
                                            <ContextMenu
                                                elements={contextMenuElements}
                                                style={contextMenuStyle}
                                                arrow={mobile ? false : true}
                                            />
                                        </ContextMenuWrapper>
                                    </DotsMenu>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    {(!selectionMode.state || mobile) && album ? (
                        <div className="album-heading__data">
                            <div className="album-heading__description">
                                <p className="album-heading__text-item">
                                    {album?.description ? (
                                        <>{album?.description} &bull;</>
                                    ) : (
                                        ''
                                    )}{' '}
                                    <strong>{album?.count + ' фото'}</strong>
                                </p>
                            </div>
                            <div className="album-heading__author">
                                <Link to={`../../${album?.creator._id}`}>
                                    <div className="album-heading__author-container">
                                        <div className="album-heading__avatar">
                                            <Avatar
                                                style={{
                                                    height: '40px',
                                                    width: '40px',
                                                }}
                                                avatarUrl={
                                                    album?.creator.avatar
                                                        ? `${process.env.REACT_APP_SERVER_ADDRESS}/static/avatars/${album?.creator._id}/${album?.creator.avatar}`
                                                        : defaultAvatar
                                                }
                                            />
                                        </div>
                                        <p className="album-heading__name">
                                            {album?.creator.name}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    {selectionMode.state && !mobile ? (
                        <div className="album-heading__selection">
                            <button
                                className="album-heading__btn"
                                onClick={handleDeleteClick}
                            >
                                Видалити
                            </button>
                            <button
                                className="album-heading__btn"
                                onClick={handleMoveClick}
                            >
                                Перемістити
                            </button>
                            <button
                                className="album-heading__btn"
                                onClick={handleCancelClick}
                            >
                                Відмінити
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </>
            </div>
        )
    }
)

export default AlbumHeading
