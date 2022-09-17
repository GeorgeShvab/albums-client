const nameValidator = (name: string) => {
    name = name.trim()
    if (name.length < 2 || name.length > 30) return false
    return true
}

export default nameValidator
