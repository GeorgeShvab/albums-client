import {
    ReactElement,
    RefObject,
    useEffect,
    useRef,
    useState,
    MouseEvent,
} from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'
import useOutsideEvent from '../../hooks/useOutsideEvent'
import useOutsideHover from '../../hooks/useOutsideHover'

const ContextMenuWrapper = ({
    children,
    refEl,
    type,
}: {
    children: ReactElement
    refEl: RefObject<HTMLElement>
    type?: 'hover' | 'click'
}): ReactElement => {
    const [menuState, setMenuState] = useState<boolean>(false)

    const contextMenuWrapper = useRef<HTMLDivElement>(null)

    const handleRefClick = () => {
        setMenuState(true)
    }

    const handleWrapperClick = (
        e: MouseEvent<HTMLDivElement> & { target: HTMLDivElement }
    ) => {
        if (e.target.closest('.context-menu__item')) {
            setMenuState(false)
        }
    }

    const handleOutsideEvent = () => {
        setMenuState(false)
    }

    useEffect(() => {
        refEl.current?.addEventListener('click', handleRefClick)

        return () => {
            refEl.current?.removeEventListener('click', handleRefClick)
        }
    }, [])

    useOutsideEvent(
        contextMenuWrapper,
        handleOutsideEvent,
        type ? type : 'click',
        ['nav__list-item', 'dots-menu']
    )

    if (!menuState) return <></>

    return (
        <div ref={contextMenuWrapper} onClick={handleWrapperClick}>
            {children}
        </div>
    )
}

export default ContextMenuWrapper
