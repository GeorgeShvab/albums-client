import { ReactElement } from 'react'
import './style.scss'

const PageTitle = ({ text }: { text: string }): ReactElement => {
    return (
        <h1 className="title">
            <span>{text}</span>
        </h1>
    )
}

export default PageTitle
