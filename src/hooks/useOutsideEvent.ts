import { RefObject, useEffect } from 'react'
import throttle from '../utils/thorttle'

const useOutsideEvent = (
    ref: RefObject<HTMLElement>,
    func: () => void,
    type: 'click' | 'hover',
    classList?: string[]
) => {
    const handleClick = (e: MouseEvent & { target: any }) => {
        if (type === 'hover') return
        if (!ref.current || ref.current?.contains(<Node>e.target)) return

        if (classList) {
            for (let className of classList) {
                if (e.target.closest('.' + className)) {
                    return
                }
            }
        }

        func()
    }

    const handleMouseOver = (e: MouseEvent & { target: any }) => {
        if (type === 'click') return
        if (!ref.current || ref.current?.contains(<Node>e.target)) {
            return
        }

        if (classList) {
            for (let className of classList) {
                if (e.target.closest('.' + className)) {
                    return
                }
            }
        }

        func()
    }

    const handleThrottleMouseOver = throttle(handleMouseOver, 500)

    useEffect(() => {
        document.addEventListener('click', handleClick)
        document.addEventListener('contextmenu', handleClick)
        document.addEventListener('mouseover', handleThrottleMouseOver)

        return () => {
            document.removeEventListener('click', handleClick)
            document.removeEventListener('contextmenu', handleClick)
            document.removeEventListener('mouseover', handleThrottleMouseOver)
        }
    }, [func, ref, type])
}

export default useOutsideEvent
