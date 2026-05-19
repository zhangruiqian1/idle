import {Game} from "@/common/entity/Game.ts";
import {init, loadFightTeam} from "@/game/preload.ts";
import {actionQueue, enemyTeam, fightMode, gameSpeed, heroTeam, layer, maxLayer, round, soul} from "@/game/store.ts";
import {FightMode, RoleState} from "@/common/enum";
import {attackBehavior} from "@/game/behavior.ts";
import {delay} from "@/common/utils";
import {getSoulByLayer} from "@/game/tower";
import {saveGame} from "@/common/storage/save.ts";
import {notify} from "@/common/message";

let step = 0

const onCreate = () => {
    init()
}

const onUpdate = async () => {
    const isWin = enemyTeam.every(it => it.state === RoleState.Dead)
    if (isWin) {
        await handleWin()
        return
    }
    const isLose = heroTeam.every(it => it.state === RoleState.Dead)
    if (isLose) {
        await handleLose()
        return
    }
    if (step >= actionQueue.length) {
        step = 0
        round.value++
    }
    const target = actionQueue[step]
    step++
    await attackBehavior(target)

}

const onDestroy = () => {
}

const onBeforeDestroy = () => {
}

export const game = new Game({onCreate, onUpdate, onBeforeDestroy, onDestroy})

export const handleWin = async () => {
    game.log(`第${layer.value}层战斗胜利！`)
    await delay(1000 / gameSpeed.value)
    soul.value += getSoulByLayer(layer.value)
    notify({
        msg: '战斗胜利！',
        desc: `灵魂+${getSoulByLayer(layer.value)}`,
    })
    switch (fightMode.value) {
        case FightMode.Push:
            layer.value++
            break
        case FightMode.Loop:
            break
    }
    saveGame()
    loadFightTeam()
}

export const handleLose = async () => {
    game.log(`第${layer.value}层战斗失败！`)
    await delay(1000 / gameSpeed.value)
    notify({
        msg: '战斗失败！',
        desc: `回到${layer.value - 1}层`,
    })
    layer.value--
    fightMode.value = FightMode.Loop
    saveGame()
    loadFightTeam()
}