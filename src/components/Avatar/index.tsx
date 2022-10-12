import { ReactElement } from 'react'
import './style.scss'

const Avatar = ({
    avatarUrl,
    style,
}: {
    avatarUrl: string
    style?: any
}): ReactElement => {
    return (
        <div className="avatar" style={style}>
            <img src={avatarUrl} alt="Avatar" className="avatar__img" />
        </div>
    )
}

export default Avatar
