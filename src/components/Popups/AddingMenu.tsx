import { ReactElement } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { showPopup } from '../../redux/slices/popup'
import MobileMenuItem from '../MobileMenus/MobileMenuItem'

const AddingMenu = (): ReactElement => {
    const dispatch = useAppDispatch()

    const addPhotoClickHadler = () => {
        showPopup({ dispatch, type: 'add-photo' })
    }

    const addAlbumClickHadler = () => {
        showPopup({ dispatch, type: 'add-album' })
    }

    return (
        <div className="popup">
            <ul className="popup__btn-group navigation">
                <li onClick={addPhotoClickHadler}>
                    <MobileMenuItem children="Додати фото" />
                </li>
                <li onClick={addAlbumClickHadler}>
                    <MobileMenuItem children="Додати альбом" />
                </li>
            </ul>
        </div>
    )
}

export default AddingMenu
