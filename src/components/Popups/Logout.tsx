import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoundedButton } from '..'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { logout } from '../../redux/slices/auth'
import { closePopup } from '../../redux/slices/popup'

const Logount = (): ReactElement => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const handleLogout = () => {
        logout(dispatch)
        closePopup(dispatch)
        navigate('/login')
    }

    const handleBackClick = () => {
        closePopup(dispatch)
    }

    return (
        <div className="popup">
            <p className="popup__text">Вийти з аккаунту?</p>
            <div className="popup__btn-group">
                <div onClick={handleBackClick}>
                    <RoundedButton style="light" text="Назад" />
                </div>
                <div onClick={handleLogout}>
                    <RoundedButton style="dark" text="Вийти" type="submit" />
                </div>
            </div>
        </div>
    )
}

export default Logount
