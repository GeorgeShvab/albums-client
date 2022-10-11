import { Children, ReactElement } from 'react'
import { Link } from 'react-router-dom'

const MobileMenuItem = ({
    children,
    link,
}: {
    children: ReactElement | string
    link?: string
}) => {
    return link ? (
        <Link to={link}>
            <div className="mobile-menu__item">{children}</div>
        </Link>
    ) : (
        <div className="mobile-menu__item">{children}</div>
    )
}

export default MobileMenuItem
