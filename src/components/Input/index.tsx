import { FormEvent, ReactElement } from 'react'

const Input = ({
    name,
    placeholder,
    onInput,
    defaultValue,
    error,
    max,
    autocomplete,
}: {
    name: string
    placeholder: string
    onInput: any
    error?: boolean
    defaultValue?: string
    max: number
    autocomplete?: string
}): ReactElement => {
    return (
        <input
            className={`input${error ? ' _error' : ''}`}
            name={name}
            type="text"
            autoComplete={autocomplete ? autocomplete : 'off'}
            placeholder={placeholder}
            spellCheck={false}
            onInput={onInput}
            maxLength={max}
            defaultValue={defaultValue ? defaultValue : ''}
        ></input>
    )
}

export default Input
