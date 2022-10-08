import { useEffect, useState } from 'react'

const useMount = ({
    opened,
    animationTime,
}: {
    opened: boolean
    animationTime: number
}) => {
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        if (opened && !mounted) {
            setMounted(true)
        } else if (!opened && mounted) {
            setTimeout(() => {
                setMounted(false)
            }, animationTime)
        }
    }, [opened, mounted])

    return [mounted]
}

export default useMount
