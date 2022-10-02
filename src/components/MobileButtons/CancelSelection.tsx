import { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { isMobile } from '../../redux/slices/device'
import {
    deactivateSelectionMode,
    isSelectionMode,
} from '../../redux/slices/selectionMode'

const CancelSelection = (): ReactElement => {
    const selectionMode = useAppSelector(isSelectionMode)
    const mobile = useAppSelector(isMobile)

    const dispatch = useAppDispatch()

    if (!mobile || !selectionMode.state) return <></>

    const handleBtnClick = () => {
        dispatch(deactivateSelectionMode())
    }

    return (
        <div
            className="mobile-button"
            onClick={handleBtnClick}
            style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
            <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="10.272"
                    y="13.1005"
                    width="4"
                    height="32"
                    rx="2"
                    transform="rotate(-45 10.272 13.1005)"
                    fill="#D5D5D5"
                />
                <rect
                    x="13.1006"
                    y="35.7279"
                    width="4"
                    height="32"
                    rx="2"
                    transform="rotate(-135 13.1006 35.7279)"
                    fill="#D5D5D5"
                />
            </svg>
        </div>
    )
}

export default CancelSelection
