const findError = (errors: any[], name: string) => {
    if (!errors.length) return ''
    const error = errors.filter(
        (item) => item.param === name || item.param === undefined
    )
    if (error.length) {
        return ' _error'
    }

    return ''
}

export default findError
