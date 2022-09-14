import { ReactElement } from 'react'
import './style.scss'

const RoundedButton = ({
    text,
    style,
}: {
    text: string
    style?: string
}): ReactElement => {
    return (
        <div className={`rounded-btn${style === 'dark' ? ' _dark' : ''}`}>
            <span>{text}</span>
        </div>
    )
}

export default RoundedButton
