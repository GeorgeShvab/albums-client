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

    const albums = useAppSelector(getAlbums)

    const divEl = useRef<HTMLDivElement>(null)

    const [inputValue, setInputValue] = useState<{ value: string; id: string }>(
        { value: '', id: '' }
    )

    const [newAlbum, setNewAlbum] = useState<boolean>(false)

    const handleInputFocus = () => {
        setList((prev) => ({ ...prev, state: true }))
    }

    const handleInput = (
        e: FormEvent<HTMLInputElement> & { target: HTMLInputElement }
    ) => {
        setList((prev) => ({
            ...prev,
            data:
                e.target.value.trim() &&
                albums?.findIndex(
                    (item) => item.name === e.target.value.trim()
                ) === -1
                    ? [
                          {
                              text: 'Створити альбом ' + e.target.value,
                              value: 'newAlbum',
                              id: 'new',
                          },
                          ...elements.filter((item) =>
                              new RegExp(e.target.value.trim(), 'ig').test(
                                  item.text
                              )
                          ),
                      ]
                    : elements.filter((item) =>
                          new RegExp(e.target.value.trim(), 'ig').test(
                              item.text
                          )
                      ),
        }))
        setInputValue({
            value: e.target.value,
            id:
                elements.findIndex((item) => item.text === e.target.value) !==
                -1
                    ? elements[
                          elements.findIndex(
                              (item) => item.text === e.target.value
                          )
                      ].id
                    : 'new',
        })
    }

    const handleOutsideClick = () => {
        if (!list.state) return
        setList((prev) => ({ ...prev, state: false }))
    }

    const handleDatalistItemClick = (
        text: string,
        value: string,
        id: string
    ) => {
        setInputValue({
            value: /Створити альбом /.test(text)
                ? text.replace(/Створити альбом /, '')
                : text,
            id: id,
        })
        setList((prev) => ({ ...prev, state: false }))
        if (value === 'newAlbum') {
            setNewAlbum(true)
        }
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
                data-new={newAlbum}
                data-albumid={
                    inputValue.id === 'new' || !inputValue.id
                        ? ''
                        : inputValue.id
                }
            />
            <ul className="list-input__datalist" style={style}>
                {list.data.map((item, index) => (
                    <li
                        key={item.id}
                        className="list-input__datalist-item"
                        onClick={() => {
                            handleDatalistItemClick(
                                item.text,
                                item.value,
                                item.id
                            )
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
