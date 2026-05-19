import {HERO_BOOK} from "@/game/book/hero.ts";
import {actionQueue, allHeroes, enemyTeam, gameSpeed, heroTeam, layer, round, soul} from "@/game/store.ts";
import {Hero} from "@/common/entity/Role.ts";
import {getEnemyTeamByLayer} from "@/game/tower";
import {getSaveData} from "@/common/storage/save.ts";
import type {SaveDataType} from "@/common/type";

// 初始化
export const init = () => {
    loadFightTeam()
}

// 重置战斗
export const resetFightTeam = () => {
    allHeroes.splice(0)
    heroTeam.splice(0)
    enemyTeam.splice(0)
    actionQueue.splice(0)
    round.value = 1
}

// 加载战斗
export const loadFightTeam = () => {
    resetFightTeam()
    loadSaveData()
    loadHeroTeam()
    loadEnemyTeam()
    loadActionQueue()
}

const loadSaveData = () => {
    const saveData = getSaveData()
    soul.value = saveData.soul
    layer.value = saveData.layer
    gameSpeed.value = saveData.speed
    loadAllHeroTeam(saveData)
}

export const loadAllHeroTeam = (saveData: SaveDataType) => {
    saveData.heroes.sort((a, b) => b.level - a.level).forEach(hero => {
        console.log('英雄', hero.pos)
        const heroBook = HERO_BOOK.find(it => it.name === hero.name)
        if (!heroBook) return
        allHeroes.push(new Hero({...heroBook, ...hero, skills: heroBook.skills}).levelUp(hero.level))
    })
    console.log('全部英雄', allHeroes)
}

// 获取我方队伍中
export const loadHeroTeam = () => {
    allHeroes.filter(it => it.pos !== 0).forEach(hero => {
        heroTeam.push(hero)
    })
    console.log('英雄阵容', heroTeam)
}

// 获取敌人队伍
export const loadEnemyTeam = () => {
    enemyTeam.push(...getEnemyTeamByLayer(layer.value))
    console.log('敌人阵容', enemyTeam)
}

export const loadActionQueue = () => {
    const allTeam = [...heroTeam, ...enemyTeam]
    // 按照速度由高到低
    allTeam.sort((a, b) => b.speed - a.speed)
    actionQueue.push(...allTeam)
    console.log('所有队伍按照速度排序', actionQueue)
}