export class Game {
    isRunning: boolean = false
    onCreate: () => void
    onUpdate: () => Promise<void>
    onBeforeDestroy: () => void
    onDestroy: () => void
    isInit: boolean = false
    logCallback: (msg: string) => void = () => {
    }
    logClearCallback: () => void = () => {
    }

    constructor(
        {
            onCreate = () => {
            },
            onUpdate = () => Promise.resolve(),
            onBeforeDestroy = () => {
            },
            onDestroy = () => {
            },
        }
    ) {
        this.onCreate = onCreate
        this.onUpdate = onUpdate
        this.onBeforeDestroy = onBeforeDestroy
        this.onDestroy = onDestroy
    }

    start() {
        this.onCreate()
        this.isRunning = true
        if (!this.isInit) {
            this.runLoop()
            this.isInit = true
        }
    }

    async runLoop() {
        if (!this.isRunning) return

        try {
            await this.onUpdate()
        } catch (err) {
            console.error('update error', err)
        }

        setTimeout(() => this.runLoop(), 1000 / 30)
    }

    over() {
        this.onBeforeDestroy()
        this.isRunning = false
        this.onDestroy()
    }

    onLog(callback: (msg: string) => void) {
        this.logCallback = callback
    }

    onLogClear(logClearCallback: () => void) {
        this.logClearCallback()
    }

    log(msg: string) {
        this.logCallback(msg)
    }

    clearLog() {
        this.logClearCallback()
    }

}