import { ReactElement } from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { getOverlayState } from '../redux/slices/overlay'

const Overlay = (): ReactElement => {
    const overlayState = useAppSelector(getOverlayState)

    return <div className={`overlay${overlayState ? ' _show' : ''}`}></div>
}

export default Overlay
