import { ReactElement, ReactNode } from 'react'
import './style.scss'

const Error = ({
    text,
    imageEl,
    style,
}: {
    text: string
    imageEl: ReactNode
    style?: any
}): ReactElement => {
    return (
        <div className="page-error" style={style}>
            <div className="page-error__container">
                <div className="page-error__img">{imageEl}</div>
                <p className="page-error__text">{text}</p>
            </div>
        </div>
    )
}

export default Error
