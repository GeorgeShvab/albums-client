import { ReactElement, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Album } from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getAlbums } from '../../redux/slices/albums'
import { isAuthorized } from '../../redux/slices/auth'
import { setPage } from '../../redux/slices/page'
import './style.scss'

const Albums = (): ReactElement => {
    const albums = useAppSelector(getAlbums)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setPage('albums'))
    }, [])

    if (!localStorage.getItem('Authorization'))
        return <Navigate to="/login"></Navigate>

    return (
        <div className="albums">
            <div className="albums__container">
                {albums?.map((item, index) => (
                    <Album {...item} key={item._id} />
                ))}
            </div>
        </div>
    )
}

export default Albums
