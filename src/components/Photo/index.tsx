import { ReactElement, useState, MouseEvent, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { isMobile } from '../../redux/slices/device'
import selectionMode, {
    activateSelectionMode,
    addPhotoToSelected,
    removePhotoFromSelected,
} from '../../redux/slices/selectionMode'
import * as types from '../../types'
import './style.scss'

const Photo = memo(
    (
        props: types.Photo & {
            selectionMode: boolean
            selected: boolean
            isAuthor?: boolean
        }
    ): ReactElement => {
        const dispatch = useAppDispatch()
        const mobile = useAppSelector(isMobile)

        const navigate = useNavigate()

        const handlePhotoClick = () => {
            if (!props.selectionMode) {
                navigate('./' + props._id)

                return
            }
            if (props.selected) {
                dispatch(removePhotoFromSelected(props._id))
                return
            }
            dispatch(addPhotoToSelected(props._id))
        }

        const handleContextMenuClick = (
            e: MouseEvent<HTMLDivElement>
        ): void => {
            if (!props.isAuthor) return
            if (!mobile) return

            e.preventDefault()

            if (props.selected) {
                dispatch(removePhotoFromSelected(props._id))
                return
            }
            if (!props.selectionMode) dispatch(activateSelectionMode())

            dispatch(addPhotoToSelected(props._id))
        }

        return (
            <div
                className={`photo${props.selected ? ' _selected' : ''}`}
                onClick={handlePhotoClick}
                onContextMenu={handleContextMenuClick}
            >
                <div className="photo-container">
                    <img
                        src={`${process.env.REACT_APP_SERVER_ADDRESS}/static/photos/${props.uploader}/${props.name}`}
                        alt={props.name}
                    />
                </div>
                <div className="photo-selection">
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.1542 15.2308C10.0428 15.2314 9.9324 15.2101 9.82931 15.168C9.72621 15.1259 9.63245 15.0638 9.55338 14.9854L6.16877 11.6008C6.00943 11.4414 5.91992 11.2253 5.91992 11C5.91992 10.7747 6.00943 10.5586 6.16877 10.3992C6.3281 10.2399 6.54421 10.1504 6.76954 10.1504C6.99487 10.1504 7.21097 10.2399 7.37031 10.3992L10.1542 13.1916L15.4765 7.86078C15.6358 7.70145 15.8519 7.61194 16.0772 7.61194C16.3026 7.61194 16.5187 7.70145 16.678 7.86078C16.8373 8.02012 16.9268 8.23622 16.9268 8.46155C16.9268 8.68689 16.8373 8.90299 16.678 9.06232L10.7549 14.9854C10.6759 15.0638 10.5821 15.1259 10.479 15.168C10.3759 15.2101 10.2655 15.2314 10.1542 15.2308Z"
                            fill="black"
                        />
                        <path
                            d="M11 22C8.82441 22 6.69767 21.3549 4.88873 20.1462C3.07979 18.9375 1.66989 17.2195 0.83733 15.2095C0.00476613 13.1995 -0.213071 10.9878 0.211367 8.85401C0.635804 6.72022 1.68345 4.76021 3.22183 3.22183C4.76021 1.68345 6.72022 0.635804 8.85401 0.211367C10.9878 -0.213071 13.1995 0.00476613 15.2095 0.83733C17.2195 1.66989 18.9375 3.07979 20.1462 4.88873C21.3549 6.69767 22 8.82441 22 11C22 13.9174 20.8411 16.7153 18.7782 18.7782C16.7153 20.8411 13.9174 22 11 22V22ZM11 1.69231C9.15912 1.69231 7.35957 2.2382 5.82893 3.26094C4.29828 4.28368 3.10529 5.73735 2.40082 7.4381C1.69634 9.13886 1.51202 11.0103 1.87116 12.8158C2.2303 14.6214 3.11677 16.2798 4.41847 17.5815C5.72018 18.8832 7.37865 19.7697 9.18416 20.1288C10.9897 20.488 12.8611 20.3037 14.5619 19.5992C16.2627 18.8947 17.7163 17.7017 18.7391 16.1711C19.7618 14.6404 20.3077 12.8409 20.3077 11C20.3077 8.53145 19.3271 6.164 17.5815 4.41847C15.836 2.67294 13.4686 1.69231 11 1.69231Z"
                            fill="black"
                        />
                    </svg>
                </div>
            </div>
        )
    }
)

export default Photo
