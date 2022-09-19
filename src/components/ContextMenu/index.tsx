import { ReactElement } from 'react'
import './style.scss'

const ContextMenu = ({
    elements,
    style = {},
}: {
    elements: { func: () => any; text: string }[]
    style?: any
}): ReactElement => {
    return (
        <div className="context-menu" style={style}>
            <ul className="context-menu__list">
                {elements.map((item, index) => (
                    <li
                        className="context-menu__item"
                        onClick={item.func}
                        key={index}
                    >
                        <h5>{item.text}</h5>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ContextMenu
