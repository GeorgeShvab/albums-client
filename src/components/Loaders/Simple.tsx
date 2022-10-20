import { ReactElement } from 'react'
import './style.scss'

const SimepleLoader = (): ReactElement => {
    return (
        <div className="loader">
            <div className="loader__container">
                <span className="loader__circle"></span>
            </div>
        </div>
    )
}

export default SimepleLoader
