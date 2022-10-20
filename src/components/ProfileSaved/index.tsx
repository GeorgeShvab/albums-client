import { ReactElement } from 'react'
import { AlbumLoader } from '..'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getUser } from '../../redux/slices/auth'
import { getProfile } from '../../redux/slices/profile'
import Album from '../Album'
import './style.scss'

const ProfileSaved = (): ReactElement => {
    const user = useAppSelector(getUser)
    const profile = useAppSelector(getProfile)

    return (
        <div className="profile-saved">
            <div className="profile-saved__container albums__container">
                {profile?.saved
                    ? profile.saved?.map((item, index) => (
                          <Album
                              {...item.album}
                              key={item.album._id}
                              authorAuthorized={
                                  user.data?._id === item.album.creator?._id &&
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

export default ProfileSaved
