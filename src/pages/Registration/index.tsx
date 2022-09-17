import React, { ReactElement, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
    Heading,
    LoginForm,
    RegistrationForm,
    RoundedButton,
} from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getUser } from '../../redux/slices/auth'
import { setPage } from '../../redux/slices/page'

const Registration = (): ReactElement => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(getUser)

    useEffect(() => {
        dispatch(setPage('registration'))
    }, [])

    if (user.status === 'loaded' && user.data) {
        return <Navigate to="/home" />
    }

    return (
        <div className="auth">
            <div className="container">
                <div className="auth__conatiner">
                    <div className="auth__wrapper">
                        <div className="auth__item">
                            <div
                                className="auth__img"
                                style={{
                                    background: 'url(../auth_bg.png)',
                                }}
                            ></div>
                        </div>
                        <div className="auth__item">
                            <div className="auth__heading">
                                <Heading
                                    title="Реєстрація"
                                    subtitle="Зареєструйтеся, щоб сповна користуватись можливостями Albums"
                                />
                            </div>
                            <div className="auth__form-wrapper">
                                <RegistrationForm />
                                <p className="auth__change-page">
                                    Вже маєте аккаунт?{' '}
                                    <Link to="/login">
                                        <span>Увійти</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
