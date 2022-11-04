import { ReactElement } from 'react'
import './style.scss'

const Avatar = ({
    avatarUrl,
    style,
}: {
    avatarUrl: string
    style?: any
}): ReactElement => {
    let avatar

    if (!/http/.test(avatarUrl)) {
        avatar = process.env.REACT_APP_SERVER_ADDRESS + avatarUrl
    } else {
        avatar = avatarUrl
    }

    return (
        <div className="avatar" style={style}>
            <img src={avatar} alt="Avatar" className="avatar__img" />
        </div>
    )
}

export default Avatar
