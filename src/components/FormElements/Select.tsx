import { ReactElement } from 'react'
import { SelectElement } from '../../types'
import './style.scss'

const Select = ({
    name,
    elements,
}: {
    name: string
    elements: SelectElement[]
}): ReactElement => {
    return (
        <select name={name} className="select">
            {elements.map((item, index) => (
                <option
                    className="select__option"
                    value={item.value}
                    onClick={item.func}
                    selected={item.selected ? true : false}
                    key={index}
                >
                    {item.text}
                </option>
            ))}
        </select>
    )
}

export default Select
