import { ReactElement } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { showPopup } from '../../redux/slices/popup'

const DeletePhotos = (): ReactElement => {
    const dispatch = useAppDispatch()

    const handleBtnClick = async () => {
        showPopup({ dispatch, type: 'delete-photos' })
    }

    return (
        <div
            className="mobile-button"
            onClick={handleBtnClick}
            style={{ background: 'rgb(234, 92, 72)', right: '25px' }}
        >
            <svg
                width="25"
                height="32"
                viewBox="0 0 25 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1.77778 28.4444C1.77778 30.4 3.37778 32 5.33333 32H19.5556C21.5111 32 23.1111 30.4 23.1111 28.4444V7.11111H1.77778V28.4444ZM6.16 15.7867L8.67556 13.2711L12.4444 17.04L16.2133 13.2711L18.7289 15.7867L14.96 19.5556L18.7289 23.3244L16.2133 25.84L12.4444 22.0711L8.67556 25.84L6.16 23.3244L9.92889 19.5556L6.16 15.7867ZM18.6667 1.77778L16.8889 0H8L6.22222 1.77778H0V5.33333H24.8889V1.77778H18.6667Z"
                    fill="white"
                />
            </svg>
        </div>
    )
}

export default DeletePhotos
