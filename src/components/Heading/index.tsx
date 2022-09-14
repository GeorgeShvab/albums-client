import { ReactElement } from 'react'
import './style.scss'

const Heading = ({
    title,
    subtitle,
}: {
    title: string
    subtitle: string
}): ReactElement => {
    return (
        <div className="heading">
            <h1 className="heading__title">{title}</h1>
            <p className="heading__subtitle">{subtitle}</p>
        </div>
    )
}

export default Heading
