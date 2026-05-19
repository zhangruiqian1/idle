import {reactive, ref, watch} from "vue";
import {Enemy, Hero, Role} from "@/common/entity/Role.ts";
import {game} from "@/game/index.ts";
import {delay} from "@/common/utils";
import {FightMode} from "@/common/enum";
import {message} from "ant-design-vue";

// 全部英雄
export const allHeroes = reactive<Hero[]>([])

// 我方英雄
export const heroTeam = reactive<Hero[]>([])

// 敌人
export const enemyTeam = reactive<Enemy[]>([])

// 行动队列
export const actionQueue = reactive<Role[]>([])

// 回合数
export const round = ref(1)

// 当前层数
export const layer = ref(1)

// 最大层数
export const maxLayer = ref(1)

// 灵魂
export const soul = ref(0)

// 战斗模式
export const fightMode = ref<FightMode>(FightMode.Push)

// 游戏速度
export const gameSpeed = ref(1)


watch(layer, () => {
    game.log(`进入第${layer.value}层`)
    if (maxLayer.value <= layer.value) {
        maxLayer.value++
    }
})

export const buyBySoul = (cost: number) => {
    return new Promise((resolve, reject) => {
        if (cost > soul.value) {
            message.warn('灵魂不足')
            reject()
            return
        }
        soul.value -= cost
        resolve(true)
    })
}
