import axios from '../../axios'
import { ReactElement, useState } from 'react'

const SaveAlbum = ({
    albumId,
    saved,
}: {
    albumId: string
    saved: boolean
}): ReactElement => {
    const [isSaved, setIsSaved] = useState<boolean>(saved)

    const handleClick = (): void => {
        setIsSaved((prev) => !prev)
        axios.post(`/album/${albumId}/save`)
    }

    return (
        <div className="album__btn" onClick={handleClick}>
            {isSaved ? (
                <svg
                    width="23"
                    height="28"
                    viewBox="0 0 23 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.5292 21.0584L1.5 25.5729V2.8C1.5 2.08843 2.08843 1.5 2.8 1.5H19.6C19.9448 1.5 20.2754 1.63696 20.5192 1.88076C20.763 2.12456 20.9 2.45522 20.9 2.8V25.5729L11.8708 21.0584L11.2 20.7229L10.5292 21.0584Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="3"
                    />
                </svg>
            ) : (
                <svg
                    width="23"
                    height="28"
                    viewBox="0 0 23 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.5292 21.0584L1.5 25.5729V2.8C1.5 2.08843 2.08843 1.5 2.8 1.5H19.6C19.9448 1.5 20.2754 1.63696 20.5192 1.88076C20.763 2.12456 20.9 2.45522 20.9 2.8V25.5729L11.8708 21.0584L11.2 20.7229L10.5292 21.0584Z"
                        stroke="white"
                        strokeWidth="3"
                    />
                </svg>
            )}
        </div>
    )
}

export default SaveAlbum
