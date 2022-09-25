import {
    ChangeAlbumVisibility,
    ChangeAlbumName,
    DeleteAlbumMobileMenu,
    ChangeAlbumVisibilityMobileMenu,
    ChangeAlbumNameMobileMenu,
    ChangeAlbumPreviewWindow,
    ChangeAlbumPreviewMobileMenu,
} from '.'
import AddAlbumMenu from './MobileMenus/AddAlbumMenu'
import AddingButton from './AddingButton'
import AddingMenu from './MobileMenus/AddingMenu'
import MobileNavigation from './MobileMenus/MobileNavigation'
import Overlay from './Overlay'
import AddAlbumWindow from './Windows/AddAlbumWindow'
import DeleteAlbumWindow from './Windows/DeleteAlbumWindow'

const FixedElementsContainer = () => {
    return (
        <>
            <AddingButton />
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
        </>
    )
}

export default FixedElementsContainer
