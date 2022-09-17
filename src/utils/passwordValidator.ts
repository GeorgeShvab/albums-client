const passwordValidator = (password: string) => {
    password = password.trim()
    if (password.length < 6 || password.length > 60) return false

    return true
}

export default passwordValidator
