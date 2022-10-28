import { ReactElement, useEffect, useState } from 'react'
import './style.scss'

const Animation = ({
    children,
    opened,
    type,
    zIndex,
}: {
    children: ReactElement
    opened: boolean
    type: 'center' | 'down-up'
    zIndex?: number
}): ReactElement => {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        setShow(opened)
    }, [opened])

    return (
        <div
            className={`animation-container ${type}${show ? ' _show' : ''}`}
            style={{ zIndex: zIndex ? zIndex : 1000 }}
        >
            {children}
        </div>
    )
}

export default Animation
