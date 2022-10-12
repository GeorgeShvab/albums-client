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
            <button className="mobile-menu__item">{children}</button>
        </Link>
    ) : (
        <button className="mobile-menu__item">{children}</button>
    )
}

export default MobileMenuItem
