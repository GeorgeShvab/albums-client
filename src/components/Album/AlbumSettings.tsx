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
        showPopup({
            dispatch: dispatch,
            type: 'delete-album',
            data: { album: props },
        })
    }

    const updateVisibility = (): void => {
        showPopup({
            dispatch: dispatch,
            type: 'update-album-visibility',
            data: { album: props },
        })
    }

    const changeName = (): void => {
        showPopup({
            type: 'update-album-name',
            dispatch,
            data: { album: props },
        })
    }

    const changePreview = () => {
        showPopup({
            dispatch,
            type: 'update-album-preview',
            data: { album: props },
        })
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
            func: updateVisibility,
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
