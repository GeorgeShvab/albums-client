const emailValidator = (email: string) => {
    email = email.trim()
    if (!/@/.test(email)) return false
    if (!/./.test(email)) return false
    if (!/^[a-z]|[A-Z]|[0-9]|@|.*$/.test(email)) return false
    if (email.length < 5) return false

    return true
}

export default emailValidator
