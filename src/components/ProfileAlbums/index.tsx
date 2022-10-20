import { ReactElement } from 'react'
import { AlbumLoader } from '..'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getUser } from '../../redux/slices/auth'
import { getProfile } from '../../redux/slices/profile'
import * as types from '../../types'
import Album from '../Album'
import './style.scss'

const ProfileAlbums = (): ReactElement => {
    const user = useAppSelector(getUser)
    const profile = useAppSelector(getProfile)

    return (
        <div className="profile-albums">
            <div className="profile-albums__container albums__container">
                {profile?.albums
                    ? profile.albums?.map((item, index) => (
                          <Album
                              {...item}
                              key={item._id}
                              authorAuthorized={
                                  user.data?._id === item.creator?._id &&
                                  user.data
                                      ? true
                                      : false
                              }
                          />
                      ))
                    : new Array(10)
                          .fill(null)
                          .map((item, index) => <AlbumLoader key={index} />)}
            </div>
        </div>
    )
}

export default ProfileAlbums
