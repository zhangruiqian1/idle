import {saveGame} from "@/common/storage/save.ts";
import {SAVE_TIME_OUT} from "@/common/constant";
import {Thread} from "@/common/entity/Thread.ts";

const saveThread = new Thread(saveGame, SAVE_TIME_OUT)

export const startAllThread = () => {
    saveThread.start()
}

const stopAllThread = () => {
    saveThread.stop()
}
