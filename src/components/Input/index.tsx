import { ReactElement } from 'react'

const Input = ({
    name,
    placeholder,
    onInput,
    defaultValue,
    error,
    max,
}: {
    name: string
    placeholder: string
    onInput: () => void
    error?: boolean
    defaultValue?: string
    max: number
}): ReactElement => {
    return (
        <input
            className={`input${error ? ' _error' : ''}`}
            name={name}
            type="text"
            autoComplete="off"
            placeholder={placeholder}
            spellCheck={false}
            onInput={onInput}
            maxLength={max}
            defaultValue={defaultValue ? defaultValue : ''}
        ></input>
    )
}

export default Input
