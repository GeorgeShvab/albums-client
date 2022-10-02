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

    useEffect(() => {
        const html = document.querySelector('html')
        if (html) html.style.overflow = 'hidden'

        return () => {
            const html = document.querySelector('html')
            if (html) html.style.overflow = 'auto'
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
