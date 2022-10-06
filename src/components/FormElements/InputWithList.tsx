import { FormEvent, KeyboardEvent, ReactElement, useRef, useState } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { getAlbums } from '../../redux/slices/albums'
import { DataListElement, SelectElement } from '../../types'
import './style.scss'

const InputWithList = ({
    elements,
    name,
    style,
}: {
    elements: DataListElement[]
    name: string
    style?: { [key: string]: string }
}): ReactElement => {
    const [list, setList] = useState<{
        state: boolean
        data: DataListElement[]
    }>({ state: false, data: elements })

    const divEl = useRef<HTMLDivElement>(null)

    const [inputValue, setInputValue] = useState<{ value: string }>({
        value: '',
    })

    const handleInputFocus = () => {
        setList((prev) => ({ ...prev, state: true }))
    }

    const handleInput = (
        e: FormEvent<HTMLInputElement> & { target: HTMLInputElement }
    ) => {
        const filtredElements = elements.filter((item, index) =>
            new RegExp(e.target.value, 'ig').test(item.text)
        )

        setList((prev) => ({
            ...prev,
            data: filtredElements,
        }))

        setInputValue({
            value: e.target.value,
        })
    }

    const handleOutsideClick = () => {
        if (!list.state) return
        setList((prev) => ({ ...prev, state: false }))
    }

    const handleDatalistItemClick = (text: string) => {
        setInputValue({
            value: /Створити альбом /.test(text)
                ? text.replace(/Створити альбом /, '')
                : text,
        })

        setList((prev) => ({ ...prev, state: false }))
    }

    useOutsideClick(divEl, handleOutsideClick, ['mobile-button'])

    return (
        <div
            className={`list-input${
                list.state && list.data.length ? ' _show' : ''
            }`}
            ref={divEl}
        >
            <input
                type="text"
                className="list-input__input"
                onFocus={handleInputFocus}
                onInput={handleInput}
                name={name}
                value={inputValue.value}
                autoComplete="off"
                spellCheck={false}
            />
            <ul className="list-input__datalist" style={style}>
                {list.data.map((item, index) => (
                    <li
                        key={item.id}
                        className="list-input__datalist-item"
                        onClick={() => {
                            handleDatalistItemClick(item.text)
                        }}
                    >
                        <span>{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default InputWithList
