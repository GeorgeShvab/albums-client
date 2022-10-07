import { ReactElement, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useOutsideClick from '../../hooks/useOutsideClick'
import { getPhotos } from '../../redux/slices/photos'
import { Photo } from '../../types'
import './style.scss'

const FullScreenPhoto = (): ReactElement => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const containerEl = useRef<HTMLDivElement>(null)

    const params = useParams()

    const photo = useAppSelector(getPhotos)?.find(
        (item) => item._id === params.photoId
    )

    const handleOutsideClick = () => {
        navigate('../')
    }

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            navigate(-1)
        }
    }

    useEffect(() => {
        const body = document.querySelector('body')
        if (body?.offsetHeight !== window.innerHeight) {
            body?.classList.add('_overflow-hidden')
        }
        if (body) body.style.overflow = 'hidden'

        document.addEventListener('keyup', handleKeyUp)

        return () => {
            const body = document.querySelector('body')
            body?.classList.remove('_overflow-hidden')
            if (body) body.style.overflow = 'auto'

            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useOutsideClick(containerEl, handleOutsideClick, ['photo'])

    return (
        <div className="full-screen">
            {photo ? (
                <div className="full-screen__container">
                    <div ref={containerEl} className="full-screen__img">
                        <img
                            className="full-screen__photo"
                            src={`${process.env.REACT_APP_SERVER_ADDRESS}/static/photos/${photo?.uploader}/${photo?.name}`}
                            alt={photo?.name}
                        />
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default FullScreenPhoto
