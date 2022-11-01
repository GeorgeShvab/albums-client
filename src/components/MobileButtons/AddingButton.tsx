import { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { isAuthorized } from '../../redux/slices/auth'
import { isMobile } from '../../redux/slices/device'
import { showPopup } from '../../redux/slices/popup'
import { isSelectionMode } from '../../redux/slices/selectionMode'
import './style.scss'

const AddButton = (): ReactElement => {
    const isAuth = useAppSelector(isAuthorized)
    const mobile = useAppSelector(isMobile)
    const selectionMode = useAppSelector(isSelectionMode)

    const dispatch = useAppDispatch()

    if (!isAuth || !mobile || selectionMode.state) {
        return <></>
    }

    const handleBtnClick = () => {
        showPopup({ dispatch: dispatch, type: 'adding' })
    }

    return (
        <div
            className="mobile-button"
            onClick={handleBtnClick}
            style={{ right: '25px' }}
        >
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="14" width="4" height="32" rx="2" fill="#D5D5D5" />
                <rect
                    y="18"
                    width="4"
                    height="32"
                    rx="2"
                    transform="rotate(-90 0 18)"
                    fill="#D5D5D5"
                />
            </svg>
        </div>
    )
}

export default AddButton
