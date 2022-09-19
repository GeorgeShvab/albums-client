import { stringify } from 'querystring'
import { FormEvent, FormEventHandler, ReactElement, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RoundedButton } from '../'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { fetchLog } from '../../redux/slices/auth'
import { LoginFormEvent } from '../../types'
import findError from '../../utils/findErrorByName'

const LoginFrom = (): ReactElement => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [errors, setErrors] = useState<any[]>([])

    const handleSubmit = async (e: LoginFormEvent) => {
        try {
            e.preventDefault()
            if (!e.target.email.value.trim()) {
                setErrors((prev) => [
                    ...prev,
                    {
                        msg: 'Поле повинно бути заповнене',
                        param: 'email',
                    },
                ])
                return
            }
            if (!e.target.password.value.trim()) {
                setErrors((prev) => [
                    ...prev,
                    {
                        msg: 'Поле повинно бути заповнене',
                        param: 'password',
                    },
                ])
                return
            }

            if (!e.target.password.value.trim() || !e.target.email.value.trim())
                return

            const data: any = await dispatch(
                fetchLog({
                    email: e.target.email.value,
                    password: e.target.password.value,
                })
            )

            if (!data.payload.success) {
                setErrors(data.payload.errors)
            } else {
                navigate('/home')
            }
        } catch (e) {
            setErrors([
                { msg: 'Сервер не відповідає, спробуйте ще раз пізніше' },
            ])
        }
    }

    const handleInput = (
        e: FormEvent<HTMLInputElement> & { target: HTMLInputElement }
    ) => {
        if (errors.length) {
            setErrors((prev) =>
                prev.filter(
                    (item) =>
                        item.param !== e.target.name && item.param !== undefined
                )
            )
        }
    }

    return (
        <form action="" className="auth__form form" onSubmit={handleSubmit}>
            <div className="form__item">
                <input
                    type="text"
                    className={`form__input${
                        errors[0] ? findError(errors, 'email') : ''
                    }`}
                    name="email"
                    autoComplete="email"
                    placeholder="Емейл"
                    onInput={handleInput}
                    spellCheck={false}
                />
            </div>
            <div className="form__item">
                <input
                    type="password"
                    className={`form__input${
                        errors[0] ? findError(errors, 'password') : ''
                    }`}
                    name="password"
                    autoComplete="password"
                    placeholder="Пароль"
                    onInput={handleInput}
                    spellCheck={false}
                />
            </div>
            <div className="form__forgot-password">
                <div>
                    <Link to="/password-reset">
                        <span>Забули пароль?</span>
                    </Link>
                </div>
            </div>
            <div className="form__error">
                <div className="form__error-container">
                    <div>
                        <p className="error">
                            {errors.length ? errors[0].msg : ''}
                        </p>
                    </div>
                </div>
            </div>
            <div className="form__submit">
                <RoundedButton text="Увійти" style="dark" type="submit" />
            </div>
            <div className="form__oauth">
                <div className="form__oauth-item">
                    <div className="form__oauth-container">
                        <svg
                            width="35"
                            height="35"
                            viewBox="0 0 35 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17.5 7.29167C19.8578 7.29167 22.0227 8.0989 23.7509 9.44134L29.0551 4.38096C25.9712 1.66243 21.9343 0 17.5 0C10.7806 0 4.95351 3.79154 2.021 9.3477L7.91913 14.0041C9.34791 10.0908 13.0922 7.29167 17.5 7.29167Z"
                                fill="#F44336"
                            />
                            <path
                                d="M34.8484 19.6902C34.9396 18.9732 35 18.2418 35 17.5C35 16.249 34.8634 15.0308 34.6139 13.8542H17.5V21.1458H26.9591C26.1938 23.1347 24.8314 24.8176 23.0971 25.9867L29.0171 30.6604C32.1553 27.9058 34.3029 24.0484 34.8484 19.6902Z"
                                fill="#2196F3"
                            />
                            <path
                                d="M7.29167 17.5C7.29167 16.27 7.52042 15.0961 7.9191 14.0041L2.02096 9.3477C0.735486 11.7834 0 14.5544 0 17.5C0 20.4127 0.721957 23.153 1.98073 25.5689L7.88634 20.9066C7.50814 19.8398 7.29167 18.6965 7.29167 17.5Z"
                                fill="#FFC107"
                            />
                            <path
                                d="M17.5 27.7083C13.0586 27.7083 9.29018 24.8668 7.88632 20.9066L1.98071 25.5689C4.89889 31.1697 10.7476 35 17.5 35C21.9155 35 25.9419 33.3597 29.0171 30.6604L23.0971 25.9867C21.4976 27.0651 19.5831 27.7083 17.5 27.7083Z"
                                fill="#00B060"
                            />
                            <path
                                opacity="0.1"
                                d="M17.5 34.6354C12.3496 34.6354 7.71855 32.5104 4.44434 29.1248C7.64948 32.7218 12.3032 35 17.5 35C22.6488 35 27.2639 32.7667 30.4618 29.2261C27.1973 32.5568 22.6014 34.6354 17.5 34.6354Z"
                                fill="black"
                            />
                            <path
                                opacity="0.1"
                                d="M17.5 20.7812V21.1458H26.9591L27.1068 20.7812H17.5Z"
                                fill="black"
                            />
                            <path
                                d="M34.9918 17.7144C34.9929 17.6426 34.9999 17.572 34.9999 17.5C34.9999 17.4796 34.9967 17.46 34.9966 17.4396C34.9956 17.5314 34.991 17.6222 34.9918 17.7144Z"
                                fill="#E6E6E6"
                            />
                            <path
                                opacity="0.2"
                                d="M17.5 13.8542V14.2187H34.6873C34.6643 14.0984 34.6392 13.9736 34.6139 13.8542H17.5Z"
                                fill="white"
                            />
                            <path
                                d="M34.6139 13.8542H17.5V21.1458H26.9591C25.4881 24.969 21.8417 27.7083 17.5 27.7083C11.8621 27.7083 7.29167 23.1379 7.29167 17.5C7.29167 11.862 11.8621 7.29167 17.5 7.29167C19.5444 7.29167 21.4286 7.91972 23.0249 8.95517C23.2692 9.11396 23.5213 9.26305 23.7509 9.44134L29.055 4.38096L28.9354 4.28893C25.8664 1.62905 21.8802 0 17.5 0C7.83498 0 0 7.83498 0 17.5C0 27.1649 7.83498 35 17.5 35C26.4216 35 33.7684 28.319 34.8484 19.6902C34.9396 18.9732 35 18.2418 35 17.5C35 16.249 34.8634 15.0308 34.6139 13.8542Z"
                                fill="url(#paint0_linear_64_151)"
                            />
                            <path
                                opacity="0.1"
                                d="M23.025 8.59059C21.4287 7.55514 19.5445 6.92709 17.5001 6.92709C11.8622 6.92709 7.29175 11.4975 7.29175 17.1354C7.29175 17.1969 7.29258 17.245 7.29364 17.3063C7.392 11.7535 11.9237 7.29167 17.5001 7.29167C19.5445 7.29167 21.4287 7.91972 23.025 8.95517C23.2693 9.11396 23.5214 9.26305 23.751 9.44134L29.0551 4.38097L23.751 9.07676C23.5214 8.89847 23.2693 8.74938 23.025 8.59059Z"
                                fill="black"
                            />
                            <path
                                opacity="0.2"
                                d="M17.5 0.364583C21.8386 0.364583 25.7876 1.9664 28.8448 4.5815L29.055 4.38096L28.8946 4.24123C25.8256 1.58136 21.8802 0 17.5 0C7.83498 0 0 7.83498 0 17.5C0 17.5615 0.00854496 17.6209 0.00916796 17.6823C0.107969 8.10228 7.89649 0.364583 17.5 0.364583Z"
                                fill="white"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_64_151"
                                    x1="0"
                                    y1="17.5"
                                    x2="35"
                                    y2="17.5"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="white" stopOpacity="0.2" />
                                    <stop
                                        offset="1"
                                        stopColor="white"
                                        stopOpacity="0"
                                    />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span>Продовжити з Google</span>
                    </div>
                </div>
                <div className="form__oauth-item">
                    <div className="form__oauth-container">
                        <svg
                            width="36"
                            height="35"
                            viewBox="0 0 36 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.5009 0C7.83635 0 0 8.03168 0 17.9463C0 25.8764 5.01589 32.5955 11.9694 34.9706C12.8444 35.1347 13.1648 34.58 13.1648 34.1034C13.1648 33.6737 13.1491 32.5486 13.1413 31.0485C8.27387 32.1345 7.24257 28.6421 7.24257 28.6421C6.44565 26.5717 5.29715 26.017 5.29715 26.017C3.71113 24.8998 5.41435 24.9232 5.41435 24.9232C7.17225 25.0482 8.09418 26.7749 8.09418 26.7749C9.65676 29.5172 12.1881 28.7281 13.1882 28.2671C13.3445 27.1108 13.7976 26.3139 14.2976 25.8686C10.4146 25.4154 6.32846 23.8763 6.32846 17.0009C6.32846 15.0399 7.00818 13.4382 8.12543 12.1881C7.94573 11.735 7.34414 9.90677 8.29731 7.43789C8.29731 7.43789 9.76614 6.95349 13.1101 9.27393C14.5086 8.87547 16.0008 8.68015 17.4931 8.67233C18.9776 8.68015 20.4776 8.87547 21.8762 9.27393C25.2201 6.95349 26.6811 7.43789 26.6811 7.43789C27.6343 9.90677 27.0327 11.735 26.853 12.1881C27.9702 13.446 28.65 15.0477 28.65 17.0009C28.65 23.8919 24.556 25.4076 20.6573 25.8529C21.2824 26.4076 21.8449 27.5015 21.8449 29.1734C21.8449 31.572 21.8215 33.5096 21.8215 34.0956C21.8215 34.5721 22.134 35.1347 23.0247 34.955C29.9938 32.5877 35.0019 25.8686 35.0019 17.9463C35.0019 8.03168 27.1655 0 17.5009 0Z"
                                fill="black"
                            />
                        </svg>
                        <span>Продовжити з Github</span>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LoginFrom
