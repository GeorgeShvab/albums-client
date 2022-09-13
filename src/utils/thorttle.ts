function throttle(func: (e: any) => void, ms: number) {
    let isThrottled: boolean = false
    let savedArgs: any
    let saveThis: any

    function wrapper(this: any, ...args: [any]) {
        if (isThrottled) {
            saveThis = this
            savedArgs = arguments
            return
        }

        func.apply(this, args)

        isThrottled = true

        setTimeout(() => {
            isThrottled = false
            if (savedArgs) {
                wrapper.apply(saveThis, savedArgs)
                saveThis = savedArgs = null
            }
        }, ms)
    }

    return wrapper
}

export default throttle
