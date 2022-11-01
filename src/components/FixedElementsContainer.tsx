import { AnimationWrapper } from '.'
import { useAppSelector } from '../hooks/reduxHooks'
import { isMobile } from '../redux/slices/device'
import { getOverlayState } from '../redux/slices/overlay'
import AddingMenu from './Popups/AddingMenu'
import Overlay from './Overlay'
import UpdateAlbumDescription from './Popups/UpdateAlbumDescription'
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
import MovePhotos from './Popups/MovePhotos'
import AddPhoto from './Popups/AddPhoto'
import UpdatePreview from './Popups/UpdatePreview'

const FixedElementsContainer = () => {
    const overlay = useAppSelector(getOverlayState)
    const mobile = useAppSelector(isMobile)
    const popup = useAppSelector(getPopupState)

    return (
        <>
            {overlay ? <Overlay /> : ''}
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
