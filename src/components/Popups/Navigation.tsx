import { ReactElement } from 'react'
import { Avatar } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getUser, isAuthorized } from '../../redux/slices/auth'
import MobileMenuItem from './MobileMenuItem'
import RoundedButton from '../RoundedButton'
import { closePopup } from '../../redux/slices/popup'
import defaultAvatar from '../../static/default-avatar.jpg'
import './style.scss'

const Navigation = (): ReactElement => {
    const dispatch = useAppDispatch()

    const authorized = useAppSelector(isAuthorized)
    const user = useAppSelector(getUser)

    const menuClickHandler = () => {
        closePopup(dispatch)
    }

    if (authorized) {
        return (
            <div className="popup">
                <ul className="popup__btn-group navigation">
                    <li onClick={menuClickHandler}>
                        <MobileMenuItem
                            children={
                                <Avatar
                                    style={{ height: '70px', width: '70px' }}
                                    avatarUrl={
                                        user.data?.avatar
                                            ? `${process.env.REACT_APP_SERVER_ADDRESS}/static/avatars/${user.data?._id}/${user.data?.avatar}`
                                            : defaultAvatar
                                    }
                                />
                            }
                            link={'/' + user.data?._id}
                        />
                    </li>
                    <li onClick={menuClickHandler}>
                        <MobileMenuItem children="Альбоми" link="/albums" />
                    </li>
                    <li onClick={menuClickHandler}>
                        <MobileMenuItem children="Головна" link="/home" />
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className="popup">
            <ul className="popup__btn-group navigation">
                <li onClick={menuClickHandler}>
                    <MobileMenuItem children="Головна" link="/" />
                </li>
                <li onClick={menuClickHandler}>
                    <MobileMenuItem
                        children={
                            <RoundedButton text="Реєстрація" style="dark" />
                        }
                        link="/registration"
                    />
                </li>
                <li onClick={menuClickHandler}>
                    <MobileMenuItem
                        children={<RoundedButton text="Вхід" />}
                        link="/login"
                    />
                </li>
            </ul>
        </div>
    )
}

export default Navigation
