import { ReactElement, useRef } from 'react'
import { ContextMenu, ContextMenuWrapper, DotsMenu } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { isMobile } from '../../redux/slices/device'
import { showMobileMenu } from '../../redux/slices/mobileMenu'
import { showOverlay } from '../../redux/slices/overlay'
import { showPopup } from '../../redux/slices/popup'
import { showWindow } from '../../redux/slices/window'
import * as types from '../../types'

const AlbumSettings = (
    props: types.Album & { authorAuthorized?: boolean }
): ReactElement => {
    const dispatch = useAppDispatch()
    const mobile = useAppSelector(isMobile)

    const refEl = useRef<HTMLDivElement>(null)

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

    const changeAlbumDescription = () => {
        showPopup({
            type: 'update-album-description',
            dispatch,
            data: { album: props },
        })
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
        {
            text: 'Змінити опис альбому',
            func: changeAlbumDescription,
        },
    ]

    return (
        <div ref={refEl}>
            <DotsMenu
                style={{
                    top: '20px',
                    right: mobile ? '12.5px' : '17.5px',
                }}
            >
                <ContextMenuWrapper refEl={refEl} type="hover">
                    <ContextMenu
                        elements={contextMenuElements}
                        style={{
                            top: mobile ? '-7px' : '0',
                            right: '0',
                            transform: 'none',
                        }}
                    />
                </ContextMenuWrapper>
            </DotsMenu>
        </div>
    )
}

export default AlbumSettings
