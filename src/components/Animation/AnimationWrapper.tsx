import { cloneElement, ReactElement, useEffect, useState } from 'react'
import useMount from '../../hooks/useMount'
import AnimationContainer from './DownUpAnimation'

const AnimationWrapper = ({
    children,
    opened,
}: {
    children: ReactElement
    opened: boolean
}): ReactElement => {
    const [mount] = useMount({ opened, animationTime: 200 })

    const [childOpened, setChildOpened] = useState<boolean>(false)

    useEffect(() => {
        if (!opened) {
            setChildOpened(opened)
        } else {
            setTimeout(() => {
                setChildOpened(opened)
            }, 30)
        }
    }, [opened])

    if (!mount) return <></>

    return cloneElement(children, { ...children.props, opened: childOpened })
}

export default AnimationWrapper
