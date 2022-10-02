import { ReactElement } from 'react'
import './style.scss'

const BtnRow = ({
    elements,
}: {
    elements: {
        func: () => void
        text: string
        style?: { [key: string]: string }
    }[]
}): ReactElement => {
    return (
        <div className="btn-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            {elements.map((item) => (
                <button
                    style={item.style ? item.style : {}}
                    className="btn-row__item"
                    onClick={item.func}
                >
                    <span>{item.text}</span>
                </button>
            ))}
        </div>
    )
}

export default BtnRow
