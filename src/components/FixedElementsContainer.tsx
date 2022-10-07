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
} from '.'
import AddAlbumMenu from './MobileMenus/AddAlbumMenu'
import AddingMenu from './MobileMenus/AddingMenu'
import MobileNavigation from './MobileMenus/MobileNavigation'
import Overlay from './Overlay'
import AddAlbumWindow from './Windows/AddAlbumWindow'
import DeleteAlbumWindow from './Windows/DeleteAlbumWindow'

const FixedElementsContainer = () => {
    return (
        <>
            <AddingMenu />
            <AddAlbumMenu />
            <DeleteAlbumWindow />
            <AddAlbumWindow />
            <ChangeAlbumVisibility />
            <Overlay />
            <MobileNavigation />
            <ChangeAlbumName />
            <DeleteAlbumMobileMenu />
            <ChangeAlbumVisibilityMobileMenu />
            <ChangeAlbumNameMobileMenu />
            <ChangeAlbumPreviewWindow />
            <ChangeAlbumPreviewMobileMenu />
            <DeletePhotos />
            <CancelSelection />
            <MovePhotos />
            <DeletePhotosMobileMenu />
            <DeletePhotosWindow />
            <MovePhotosMobileMenu />
            <MovePhotosWindow />
            <AddPhotoMobileMenu />
            <AddPhotoWindow />
        </>
    )
}

export default FixedElementsContainer
