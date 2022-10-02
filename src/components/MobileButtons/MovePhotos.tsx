import { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { isMobile } from '../../redux/slices/device'
import { showMobileMenu } from '../../redux/slices/mobileMenu'
import { showOverlay } from '../../redux/slices/overlay'
import { isSelectionMode } from '../../redux/slices/selectionMode'

const MovePhotos = (): ReactElement => {
    const selectionMode = useAppSelector(isSelectionMode)
    const mobile = useAppSelector(isMobile)

    const dispatch = useAppDispatch()

    if (!mobile || !selectionMode.state) return <></>

    const handleBtnClick = () => {
        dispatch(showOverlay())
        dispatch(showMobileMenu('move-photos'))
    }

    return (
        <div
            className="mobile-button"
            onClick={handleBtnClick}
            style={{ left: '25px' }}
        >
            <svg
                width="20"
                height="32"
                viewBox="0 0 20 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 22H6V32H14V22H20L10 10L0 22ZM0 0V6H20V0H0Z"
                    fill="#D5D5D5"
                />
            </svg>
        </div>
    )
}

export default MovePhotos
