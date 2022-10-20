import { ReactElement, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getProfile, setSection } from '../../redux/slices/profile'
import './style.scss'

const ProfileNav = (): ReactElement => {
    const dispatch = useAppDispatch()

    const profile = useAppSelector(getProfile)

    const handleNavBtnClick = (type: 'albums' | 'saved') => {
        dispatch(setSection(type))
    }

    return (
        <div className="profile-nav">
            <div
                className={`profile-nav__container${
                    profile?.section === 'albums' ? ' _albums' : ' _saved'
                }`}
            >
                <button
                    className="profile-nav__btn-container"
                    onClick={handleNavBtnClick.bind(null, 'albums')}
                >
                    <span className="profile-nav__text">Альбоми</span>
                </button>
                <button
                    className="profile-nav__btn-container"
                    onClick={handleNavBtnClick.bind(null, 'saved')}
                >
                    <span className="profile-nav__text">Збережено</span>
                </button>
                <span className="profile-nav__line"></span>
            </div>
        </div>
    )
}

export default ProfileNav
