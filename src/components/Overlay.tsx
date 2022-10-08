import { ReactElement } from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { getOverlayState } from '../redux/slices/overlay'

const Overlay = (): ReactElement => {
    return <div className="overlay"></div>
}

export default Overlay
