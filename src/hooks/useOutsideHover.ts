import { Ref, RefObject, useEffect } from 'react'
import throttle from '../utils/thorttle'

const useOutsideHover = (
    ref: RefObject<HTMLElement>,
    func: () => void,
    classList?: string[],
    disabled?: boolean
) => {
    const documentHoverHandler = (e: MouseEvent & { target: any }) => {
        if (disabled) return

        if (!ref.current || ref.current.contains(<Node>e.target)) {
            return
        }

        if (classList) {
            for (let item of classList) {
                if (e.target?.closest('.' + item)) {
                    return
                }
            }
        }

        func()
    }

    useEffect(() => {
        document.addEventListener(
            'mouseover',
            throttle(documentHoverHandler, 500)
        )

        return () => {
            document.addEventListener(
                'mouseover',
                throttle(documentHoverHandler, 500)
            )
        }
    }, [ref, func])
}

export default useOutsideHover
