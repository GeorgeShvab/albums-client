import { ReactElement, useEffect, useState } from 'react'
import useMount from '../../hooks/useMount'
import './style.scss'

const MobileAnimation = ({
    children,
    opened,
    zIndex,
}: {
    children: ReactElement
    opened: boolean
    zIndex?: number
}): ReactElement => {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        setShow(opened)
    }, [opened])

    return (
        <div
            className={`animation-container down-up${show ? ' _show' : ''}`}
            style={{ zIndex: zIndex ? zIndex : 1000 }}
        >
            {children}
        </div>
    )
}

export default MobileAnimation
