import { FormEvent, ReactElement, useRef, useState } from 'react'
import FilePreviewItem from './FIlePreviewItem'

import './style.scss'

const FIleInput = ({
    text,
    multiple,
    name,
}: {
    text?: string
    multiple?: boolean
    name?: string
}): ReactElement => {
    const [choosedImageUrls, setChoosedImageUrls] = useState<any[] | null>(null)

    const inputEl = useRef<HTMLInputElement>(null)

    const handleInputChange = (e: FormEvent & { target: HTMLInputElement }) => {
        if (e.target && e.target.files) {
            setChoosedImageUrls(
                Array.from(e.target.files).map((item) => {
                    return URL.createObjectURL(item)
                })
            )
        }
        if (!e.target.files?.length) {
            setChoosedImageUrls(null)
        }
    }

    const handleFileInputClik = (): void => {
        inputEl.current?.click()
    }

    return (
        <div className="file-input" onClick={handleFileInputClik}>
            {choosedImageUrls ? (
                <div className="file-input__preview">
                    <div className="file-input__preview-container">
                        {choosedImageUrls
                            ? choosedImageUrls.map((item, index) => (
                                  <FilePreviewItem url={item} key={index} />
                              ))
                            : ''}
                    </div>
                </div>
            ) : (
                ''
            )}
            <input
                accept="image/png, image/jpg, image/jpeg"
                type="file"
                multiple={multiple ? true : false}
                className="file-input__input"
                name={name}
                onChange={handleInputChange}
                ref={inputEl}
                hidden
            />
            {!choosedImageUrls || !choosedImageUrls?.length ? (
                <div className="file-input__content">
                    <div className="file-input__img">
                        <svg
                            width="230"
                            height="148"
                            viewBox="0 0 230 148"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M187.953 62.2833C187.953 61.6667 188.056 61.05 188.056 60.4333C188.056 27.0306 161.462 0 128.656 0C104.989 0 84.6585 14.0806 75.1094 34.4306C70.9509 32.3236 66.279 31.0903 61.3504 31.0903C46.2054 31.0903 33.5759 42.3444 31.1629 57.0417C12.9888 63.3111 0 80.7319 0 101.236C0 127.033 20.5871 148 45.9487 148H98.5714V106.889H73.8259L115 63.8764L156.174 106.838H131.429V147.949H188.056C211.261 147.949 230 128.678 230 105.09C230 81.5028 211.158 62.3347 187.953 62.2833Z"
                                fill="#D5D5D5"
                            />
                        </svg>
                    </div>
                    {text ? <h5 className="file-input__text">{text}</h5> : ''}
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default FIleInput
