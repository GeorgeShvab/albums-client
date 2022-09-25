import { ReactElement, useRef, useState } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'
import useOutsideHover from '../../hooks/useOutsideHover'
import ContextMenu from '../ContextMenu'
import './style.scss'

const DotsMenu = (props: {
    style: any
    contextMenuStyle: any
    contextMenuElements: { func: () => void; text: string }[]
}): ReactElement => {
    const [showConextMenu, setShowContextMenu] = useState<boolean>(false)

    const btnEl = useRef<HTMLButtonElement | null>(null)

    const handleButtonClcick = (): void => {
        setShowContextMenu((prev) => !prev)
    }

    const handleOutsideClick = () => {
        setShowContextMenu(false)
    }

    useOutsideHover(btnEl, handleOutsideClick, ['dots-menu'])

    useOutsideClick(btnEl, handleOutsideClick)

    return (
        <button
            className="dots-menu"
            style={props.style}
            onClick={handleButtonClcick}
            ref={btnEl}
        >
            <span></span>
            {showConextMenu ? (
                <ContextMenu
                    elements={props.contextMenuElements}
                    arrow={false}
                    style={props.contextMenuStyle}
                />
            ) : (
                ''
            )}
        </button>
    )
}

export default DotsMenu
