export class Thread {
    interval: number | undefined
    callback: () => void
    timeout: number

    constructor(callback: () => void, timeout: number) {
        this.callback = callback
        this.timeout = timeout
    }

    start() {
        this.interval = setInterval(this.callback, this.timeout);
    }

    stop() {
        clearInterval(this.interval)
    }
}