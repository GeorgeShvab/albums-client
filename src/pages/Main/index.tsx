import { ReactElement, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heading, RoundedButton } from '../../components'
import { useAppSelector } from '../../hooks/reduxHooks'
import { isAuthorized } from '../../redux/slices/auth'
import './style.scss'

const Main = (): ReactElement => {
    useEffect(() => {
        document.title = 'Головна'
    }, [])

    const isAuth = useAppSelector(isAuthorized)

    return (
        <div className="intro">
            <div className="intro__container">
                <div className="intro__content">
                    <div className="intro__content-container">
                        <div className="intro__heading">
                            <h1 className="intro__title">
                                Зберігайте фото у хмарі
                            </h1>
                            <p className="intro__subtitle">
                                Albums дозволяє зберігати необмежену кількість
                                фото будь-яких розмірів та отримати доступ до
                                них з любого пристрою
                            </p>
                        </div>
                        <div className="intro__button">
                            <Link to={isAuth ? '/albums' : '/login'}>
                                <RoundedButton
                                    text="Розпочати роботу з Albums"
                                    style="dark"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
