import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({
    children,
    link,
    style,
}: {
    children: string | ReactElement
    link?: string
    style?: string
}): ReactElement => {
    return link ? (
        <Link to={link}>
            <div className={`nav__list-item${style ? ' ' + style : ''}`}>
                <h5>{children}</h5>
            </div>
        </Link>
    ) : (
        <div className={`nav__list-item${style ? ' ' + style : ''}`}>
            <h5>{children}</h5>
        </div>
    )
}

export default NavItem
