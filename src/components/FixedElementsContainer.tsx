import { useState } from 'react'
import {
    ChangeAlbumVisibility,
    ChangeAlbumName,
    DeleteAlbumMobileMenu,
    ChangeAlbumVisibilityMobileMenu,
    ChangeAlbumNameMobileMenu,
    ChangeAlbumPreviewWindow,
    ChangeAlbumPreviewMobileMenu,
    DeletePhotos,
    CancelSelection,
    MovePhotos,
    DeletePhotosMobileMenu,
    DeletePhotosWindow,
    MovePhotosMobileMenu,
    MovePhotosWindow,
    AddPhotoMobileMenu,
    AddPhotoWindow,
    AnimationWrapper,
    DownUpAnimation,
    CenterAnimation,
} from '.'
import { useAppSelector } from '../hooks/reduxHooks'
import { isMobile } from '../redux/slices/device'
import { getMobileMenuState } from '../redux/slices/mobileMenu'
import { getOverlayState } from '../redux/slices/overlay'
import { isSelectionMode } from '../redux/slices/selectionMode'
import { getWindowState } from '../redux/slices/window'
import {
    DeviceState,
    MobileMenuState,
    OverlayState,
    SelectionModeState,
    WindowState,
} from '../types'
import AddAlbumMenu from './MobileMenus/AddAlbum'
import AddingMenu from './MobileMenus/AddingMenu'
import MobileNavigation from './MobileMenus/MobileNavigation'
import Overlay from './Overlay'
import AddAlbumWindow from './Windows/AddAlbumWindow'
import DeleteAlbumWindow from './Windows/DeleteAlbumWindow'

const FixedElementsContainer = () => {
    const [state, setState] = useState<boolean>(false)

    const overlay = useAppSelector(getOverlayState)
    const mobileMenu = useAppSelector(getMobileMenuState)
    const window = useAppSelector(getWindowState)
    const selection = useAppSelector(isSelectionMode)
    const mobile = useAppSelector(isMobile)

    return (
        <>
            <AnimationWrapper opened={overlay}>
                {mobile ? (
                    <DownUpAnimation opened={overlay} zIndex={100}>
                        <Overlay />
                    </DownUpAnimation>
                ) : (
                    <CenterAnimation opened={overlay} zIndex={100}>
                        <Overlay />
                    </CenterAnimation>
                )}
            </AnimationWrapper>
            <AnimationWrapper
                opened={mobileMenu.type === 'adding' ? true : false}
            >
                <DownUpAnimation
                    opened={mobileMenu.type === 'adding' ? true : false}
                >
                    <AddingMenu />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={mobileMenu.type === 'navigation' ? true : false}
            >
                <DownUpAnimation
                    opened={mobileMenu.type === 'navigation' ? true : false}
                >
                    <MobileNavigation />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={mobileMenu.type === 'add-photo' ? true : false}
            >
                <DownUpAnimation
                    opened={mobileMenu.type === 'add-photo' ? true : false}
                >
                    <AddPhotoMobileMenu />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={mobileMenu.type === 'change-album-name' ? true : false}
            >
                <DownUpAnimation
                    opened={
                        mobileMenu.type === 'change-album-name' ? true : false
                    }
                >
                    <ChangeAlbumNameMobileMenu />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    mobileMenu.type === 'change-album-visibility' ? true : false
                }
            >
                <DownUpAnimation
                    opened={
                        mobileMenu.type === 'change-album-visibility'
                            ? true
                            : false
                    }
                >
                    <ChangeAlbumVisibilityMobileMenu />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    mobileMenu.type === 'change-album-preview' ? true : false
                }
            >
                <DownUpAnimation
                    opened={
                        mobileMenu.type === 'change-album-preview'
                            ? true
                            : false
                    }
                >
                    <ChangeAlbumPreviewMobileMenu />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={mobileMenu.type === 'delete-album' ? true : false}
            >
                <DownUpAnimation
                    opened={mobileMenu.type === 'delete-album' ? true : false}
                >
                    <DeleteAlbumMobileMenu />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={mobileMenu.type === 'delete-photos' ? true : false}
            >
                <DownUpAnimation
                    opened={mobileMenu.type === 'delete-photos' ? true : false}
                >
                    <DeletePhotosMobileMenu />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={mobileMenu.type === 'move-photos' ? true : false}
            >
                <DownUpAnimation
                    opened={mobileMenu.type === 'move-photos' ? true : false}
                >
                    <MovePhotosMobileMenu />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={mobileMenu.type === 'add-album' ? true : false}
            >
                <DownUpAnimation
                    opened={mobileMenu.type === 'add-album' ? true : false}
                >
                    <AddAlbumMenu />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper opened={selection.state && mobile ? true : false}>
                <DownUpAnimation
                    zIndex={50}
                    opened={selection.state && mobile ? true : false}
                >
                    <DeletePhotos />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper opened={selection.state && mobile ? true : false}>
                <DownUpAnimation
                    zIndex={50}
                    opened={selection.state && mobile ? true : false}
                >
                    <CancelSelection />
                </DownUpAnimation>
            </AnimationWrapper>
            <AnimationWrapper opened={selection.state && mobile ? true : false}>
                <DownUpAnimation
                    zIndex={50}
                    opened={selection.state && mobile ? true : false}
                >
                    <MovePhotos />
                </DownUpAnimation>
            </AnimationWrapper>
            {/*Вікна для векстопної версії*/}
            <AnimationWrapper
                opened={window.type === 'delete-album' ? true : false}
            >
                <CenterAnimation
                    opened={window.type === 'delete-album' ? true : false}
                >
                    <DeleteAlbumWindow />
                </CenterAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={window.type === 'add-album' ? true : false}
            >
                <CenterAnimation
                    opened={window.type === 'add-album' ? true : false}
                >
                    <AddAlbumWindow />
                </CenterAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    window.type === 'change-album-visibility' ? true : false
                }
            >
                <CenterAnimation
                    opened={
                        window.type === 'change-album-visibility' ? true : false
                    }
                >
                    <ChangeAlbumVisibility />
                </CenterAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={window.type === 'change-album-name' ? true : false}
            >
                <CenterAnimation
                    opened={window.type === 'change-album-name' ? true : false}
                >
                    <ChangeAlbumName />
                </CenterAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={window.type === 'change-album-preview' ? true : false}
            >
                <CenterAnimation
                    opened={
                        window.type === 'change-album-preview' ? true : false
                    }
                >
                    <ChangeAlbumPreviewWindow />
                </CenterAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={window.type === 'delete-photos' ? true : false}
            >
                <CenterAnimation
                    opened={window.type === 'delete-photos' ? true : false}
                >
                    <DeletePhotosWindow />
                </CenterAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={window.type === 'move-photos' ? true : false}
            >
                <CenterAnimation
                    opened={window.type === 'move-photos' ? true : false}
                >
                    <MovePhotosWindow />
                </CenterAnimation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={window.type === 'add-photo' ? true : false}
            >
                <CenterAnimation
                    opened={window.type === 'add-photo' ? true : false}
                >
                    <AddPhotoWindow />
                </CenterAnimation>
            </AnimationWrapper>
        </>
    )
}

export default FixedElementsContainer
