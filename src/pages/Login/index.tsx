import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { Heading, LoginForm, RoundedButton } from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import auth, { getUser } from '../../redux/slices/auth'
import { setPage } from '../../redux/slices/page'

const Login = (): ReactElement => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(getUser)

    useEffect(() => {
        dispatch(setPage('login'))
        document.title = 'Вхід'
    }, [])

    if (user.status === 'loaded' && user.data) {
        return <Navigate to="/albums" />
    }

    return (
        <div className="auth">
            <div className="container">
                <div className="auth__conatiner">
                    <div className="auth__wrapper">
                        <div className="auth__form-wrapper">
                            <div className="auth__heading">
                                <Heading
                                    title="Вхід"
                                    subtitle="Увійдіть, щоб сповна користуватись можливостями Albums"
                                />
                            </div>
                            <LoginForm />
                            <p className="auth__change-page">
                                Ще не маєте аккаунту?{' '}
                                <Link to="/registration">
                                    <span>Зареєструватись</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
