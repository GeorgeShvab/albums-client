import { ReactElement } from 'react'
import './style.scss'

const RoundedButton = ({
    text,
    style,
    type = 'button',
    size = 'huge',
}: {
    text: string
    style?: string
    type?: 'button' | 'submit' | 'reset' | undefined
    size?: 'huge' | 'small' | 'average'
}): ReactElement => {
    return (
        <button
            className={`rounded-btn${style === 'dark' ? ' _dark' : ''}${
                ' _' + size
            }`}
            type={type}
        >
            <span>{text}</span>
        </button>
    )
}

export default RoundedButton
