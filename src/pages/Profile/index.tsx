import { ReactElement, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Avatar,
    Heading,
    ProfileAlbums,
    ProfileNav,
    RoundedButton,
    SimpleLoader,
} from '../../components'
import { ProfileSaved } from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getUser, logout } from '../../redux/slices/auth'
import {
    clearProfileState,
    fetchProfile,
    getProfile,
} from '../../redux/slices/profile'
import defaultAvatar from '../../static/default-avatar.jpg'
import './style.scss'

const Profile = (): ReactElement => {
    const dispatch = useAppDispatch()

    const [error, setError] = useState<string | null>(null)

    const profile = useAppSelector(getProfile)
    const user = useAppSelector(getUser)

    const navigate = useNavigate()

    const { userId } = useParams()

    useEffect(() => {
        document.title = 'Профіль'

        try {
            if (userId) {
                dispatch(fetchProfile(userId))
            }
        } catch (e: any) {
            console.log(e)
        }
    }, [userId])

    useEffect(() => {
        if (profile) {
            document.title = profile?.name
        }
    }, [profile])

    useEffect(() => {
        return () => {
            dispatch(clearProfileState())
        }
    }, [])

    const copyLink = async () => {
        await navigator.clipboard.writeText(
            'http://localhost:3000/' + profile?._id
        )
    }

    const logOut = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="profile">
            {profile ? (
                <>
                    <div className="profile__head">
                        <div className="profile__avatar">
                            <Avatar
                                avatarUrl={
                                    profile?.avatar
                                        ? `${process.env.REACT_APP_SERVER_ADDRESS}/static/avatars/${profile?._id}/${profile?.avatar}`
                                        : defaultAvatar
                                }
                                style={{ height: '180px', width: '180px' }}
                            />
                        </div>
                        <div className="profile__heading">
                            <Heading
                                title={profile?.name}
                                subtitle={
                                    profile.description
                                        ? profile.description
                                        : ''
                                }
                            />
                        </div>
                        <div className="profile__options">
                            <div className="profile__link _left">
                                <div className="profile__link-element">
                                    <button
                                        className="circle-button"
                                        title="Копіювати посилання на сторінку"
                                        onClick={copyLink}
                                    >
                                        <div>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                                                    stroke="black"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M15 3H21V9"
                                                    stroke="black"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M10 14L21 3"
                                                    stroke="black"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {user.data?._id === profile?._id ? (
                                <div>
                                    <RoundedButton
                                        text="Редагувати профіль"
                                        style="dark"
                                        size="small"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <RoundedButton
                                        text="Підписатися"
                                        style="dark"
                                        size="small"
                                    />
                                </div>
                            )}
                            {user.data?._id == profile?._id &&
                            user.data &&
                            profile ? (
                                <div className="profile__link _right">
                                    <div className="profile__link-element">
                                        <button
                                            className="circle-button"
                                            title="Вийти"
                                            onClick={logOut}
                                        >
                                            <div>
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10.085 15.585L11.5 17L16.5 12L11.5 7L10.085 8.415L12.67 11H3V13H12.67L10.085 15.585ZM19 3H5C3.895 3 3 3.895 3 5V9H5V5H19V19H5V15H3V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="profile__link _right">
                                    <div className="profile__link-element">
                                        <button
                                            className="circle-button"
                                            title="Надіслати повідомлення"
                                        >
                                            <div>
                                                <svg
                                                    width="28"
                                                    height="28"
                                                    viewBox="0 0 28 28"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_372_17)">
                                                        <path
                                                            d="M3.5 23.3333L5.01667 18.7833C3.70585 16.8447 3.23166 14.5488 3.68225 12.3227C4.13285 10.0966 5.47757 8.09163 7.4664 6.68066C9.45522 5.2697 11.9528 4.54872 14.4948 4.65179C17.0367 4.75486 19.4501 5.67495 21.2862 7.241C23.1222 8.80704 24.256 10.9125 24.4767 13.1658C24.6975 15.4192 23.9901 17.6671 22.4862 19.4917C20.9823 21.3162 18.7841 22.5932 16.3004 23.0853C13.8168 23.5773 11.2166 23.2509 8.98333 22.1667L3.5 23.3333"
                                                            stroke="black"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M14 14V14.01"
                                                            stroke="black"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M9.33301 14V14.01"
                                                            stroke="black"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M18.667 14V14.01"
                                                            stroke="black"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_372_17">
                                                            <rect
                                                                width="28"
                                                                height="28"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <ProfileNav />
                    <div className="profile__content">
                        {profile?.section === 'albums' ? (
                            <ProfileAlbums />
                        ) : (
                            <ProfileSaved />
                        )}
                    </div>
                </>
            ) : (
                <SimpleLoader />
            )}
        </div>
    )
}

export default Profile
