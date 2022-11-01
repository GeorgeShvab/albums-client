import { useState } from 'react'
import {
    ChangeAlbumVisibility,
    ChangeAlbumName,
    DeleteAlbumMobileMenu,
    ChangeAlbumVisibilityMobileMenu,
    ChangeAlbumNameMobileMenu,
    ChangeAlbumPreviewWindow,
    ChangeAlbumPreviewMobileMenu,
    CancelSelection,
    DeletePhotosMobileMenu,
    DeletePhotosWindow,
    MovePhotosMobileMenu,
    MovePhotosWindow,
    AddPhotoMobileMenu,
    AddPhotoWindow,
    AnimationWrapper,
    DownUpAnimation,
    CenterAnimation,
    MobileLogout,
    DekstopLogout,
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
import AddingMenu from './Popups/AddingMenu'
import MobileNavigation from './MobileMenus/MobileNavigation'
import Overlay from './Overlay'
import UpdateAlbumDescription from './Popups/UpdateAlbumDescription'
import AddAlbumWindow from './Windows/AddAlbumWindow'
import DeleteAlbumWindow from './Windows/DeleteAlbumWindow'
import Animation from './Animation/Animation'
import { getPopupState } from '../redux/slices/popup'
import PopupWrapper from './Popups/PopupWrapper'
import UpdateAlbumName from './Popups/UpdateAlbumName'
import Navigation from './Popups/Navigation'
import Logount from './Popups/Logout'
import AddAlbum from './Popups/AddAlbum'
import DeleteAlbum from './Popups/DeleteAlbum'
import UpdateAlbumVisibility from './Popups/UpdateAlbumVisibility'
import DeletePhotos from './Popups/DeletePhotos'
import DeletePhotosBtn from './MobileButtons/DeletePhotos'
import MovePhotosBtn from './MobileButtons/MovePhotos'
import MovePhotos from './Popups/MovePhotos'
import AddPhoto from './Popups/AddPhoto'
import UpdatePreview from './Popups/UpdatePreview'

const FixedElementsContainer = () => {
    const [state, setState] = useState<boolean>(false)

    const overlay = useAppSelector(getOverlayState)
    const mobileMenu = useAppSelector(getMobileMenuState)
    const window = useAppSelector(getWindowState)
    const selection = useAppSelector(isSelectionMode)
    const mobile = useAppSelector(isMobile)
    const popup = useAppSelector(getPopupState)

    return (
        <>
            {overlay ? <Overlay /> : ''}
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
            <AnimationWrapper
                opened={mobileMenu.type === 'logout' ? true : false}
            >
                <DownUpAnimation
                    opened={mobileMenu.type === 'logout' ? true : false}
                >
                    <MobileLogout />
                </DownUpAnimation>
            </AnimationWrapper>
            {selection.state && mobile ? (
                <>
                    <DeletePhotosBtn />
                    <CancelSelection />
                    <MovePhotosBtn />
                </>
            ) : (
                ''
            )}
            {/*Вікна для декстопної версії*/}
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
            <AnimationWrapper opened={window.type === 'logout' ? true : false}>
                <CenterAnimation
                    opened={window.type === 'logout' ? true : false}
                >
                    <DekstopLogout />
                </CenterAnimation>
            </AnimationWrapper>
            {/* ######################################## */}
            <AnimationWrapper
                opened={
                    popup.type === 'update-album-description' && popup.state
                        ? true
                        : false
                }
            >
                <Animation
                    opened={
                        popup.type === 'update-album-description' && popup.state
                            ? true
                            : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <UpdateAlbumDescription />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    popup.type === 'update-album-name' && popup.state
                        ? true
                        : false
                }
            >
                <Animation
                    opened={
                        popup.type === 'update-album-name' && popup.state
                            ? true
                            : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <UpdateAlbumName />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    popup.type === 'navigation' && popup.state ? true : false
                }
            >
                <Animation
                    opened={
                        popup.type === 'navigation' && popup.state
                            ? true
                            : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <Navigation />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={popup.type === 'logout' && popup.state ? true : false}
            >
                <Animation
                    opened={
                        popup.type === 'logout' && popup.state ? true : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <Logount />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    popup.type === 'add-album' && popup.state ? true : false
                }
            >
                <Animation
                    opened={
                        popup.type === 'add-album' && popup.state ? true : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <AddAlbum />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={popup.type === 'adding' && popup.state ? true : false}
            >
                <Animation
                    opened={
                        popup.type === 'adding' && popup.state ? true : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <AddingMenu />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    popup.type === 'delete-album' && popup.state ? true : false
                }
            >
                <Animation
                    opened={
                        popup.type === 'delete-album' && popup.state
                            ? true
                            : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <DeleteAlbum />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    popup.type === 'update-album-visibility' && popup.state
                        ? true
                        : false
                }
            >
                <Animation
                    opened={
                        popup.type === 'update-album-visibility' && popup.state
                            ? true
                            : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <UpdateAlbumVisibility />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    popup.type === 'delete-photos' && popup.state ? true : false
                }
            >
                <Animation
                    opened={
                        popup.type === 'delete-photos' && popup.state
                            ? true
                            : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <DeletePhotos />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    popup.type === 'move-photos' && popup.state ? true : false
                }
            >
                <Animation
                    opened={
                        popup.type === 'move-photos' && popup.state
                            ? true
                            : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <MovePhotos />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    popup.type === 'add-photo' && popup.state ? true : false
                }
            >
                <Animation
                    opened={
                        popup.type === 'add-photo' && popup.state ? true : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <AddPhoto />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
            <AnimationWrapper
                opened={
                    popup.type === 'update-album-preview' && popup.state
                        ? true
                        : false
                }
            >
                <Animation
                    opened={
                        popup.type === 'update-album-preview' && popup.state
                            ? true
                            : false
                    }
                    type={mobile ? 'down-up' : 'center'}
                >
                    <PopupWrapper>
                        <UpdatePreview />
                    </PopupWrapper>
                </Animation>
            </AnimationWrapper>
        </>
    )
}

export default FixedElementsContainer
