/* 防抖函数 */
function debounce(fn: Function, num = 500) {
    let timer: any = null
    return function (this: any, ...args: any) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, num)
    }
}

/* 节流 */
function throttle(fn: Function, num = 500) {
    let canRun = true
    return function (this: any, ...args: any) {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
            fn.apply(this, args)
            canRun = true
        }, num)
    }
}

export default {
    debounce,
    throttle
}