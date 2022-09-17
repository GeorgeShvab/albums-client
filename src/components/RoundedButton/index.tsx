import { ReactElement } from 'react'
import './style.scss'

const RoundedButton = ({
    text,
    style,
    type = 'button',
}: {
    text: string
    style?: string
    type?: 'button' | 'submit' | 'reset' | undefined
}): ReactElement => {
    return (
        <button
            className={`rounded-btn${style === 'dark' ? ' _dark' : ''}`}
            type={type}
        >
            <span>{text}</span>
        </button>
    )
}

export default RoundedButton
