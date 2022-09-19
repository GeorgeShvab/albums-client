import { Ref, RefObject, useEffect } from 'react'

const useOutsideClick = (
    ref: RefObject<HTMLElement>,
    func: () => void,
    classList?: string[]
) => {
    const documentClickHandler = (e: MouseEvent & { target: any }) => {
        if (!ref.current || ref.current?.contains(<Node>e.target)) {
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
        document.addEventListener('click', documentClickHandler)
        document.addEventListener('contextmenu', documentClickHandler)

        return () => {
            document.removeEventListener('click', documentClickHandler)
            document.removeEventListener('contextmenu', documentClickHandler)
        }
    }, [ref, func])
}

export default useOutsideClick
