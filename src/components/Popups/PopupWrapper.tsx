import { ReactElement, useRef } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import useOutsideEvent from '../../hooks/useOutsideEvent'
import { hideOverlay } from '../../redux/slices/overlay'
import './style.scss'
import { closePopup } from '../../redux/slices/popup'

const PopupWrapper = ({
    children,
}: {
    children: ReactElement
}): ReactElement => {
    const dispatch = useAppDispatch()

    const popupEl = useRef<HTMLDivElement>(null)

    useOutsideClick(popupEl, closePopup.bind(null, dispatch))

    return (
        <div ref={popupEl} className="popup-wrapper">
            {children}
        </div>
    )
}

export default PopupWrapper
