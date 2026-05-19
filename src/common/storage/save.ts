import {allHeroes, gameSpeed, layer, maxLayer, soul} from "@/game/store.ts";
import type {SaveDataType} from "@/common/type";
import {Keys} from "@/common/storage/index.ts";
import {HERO_BOOK} from "@/game/book/hero.ts";

export const saveGame = () => {
    const saveData: SaveDataType = {
        heroes: allHeroes.map(it => ({
            id: it.id,
            name: it.name,
            level: it.level,
            skillNames: it.skillNames,
            equipment: it.equipment,
            pos: it.pos,
        })),
        soul: soul.value,
        layer: layer.value,
        maxLayer: maxLayer.value,
        speed: gameSpeed.value,
    }
    localStorage.setItem(Keys.SAVE_DATA, JSON.stringify(saveData))
}

export const setSaveData = (saveData: SaveDataType) => {
    localStorage.setItem(Keys.SAVE_DATA, JSON.stringify(saveData))
}

export const getSaveData = (): SaveDataType => {
    const saveDataStr = localStorage.getItem(Keys.SAVE_DATA)
    let saveData: SaveDataType
    if (saveDataStr && JSON.parse(saveDataStr)) {
        saveData = JSON.parse(saveDataStr)
    } else {
        saveData = {
            heroes: HERO_BOOK.slice(0, 3).map((hero, index) => ({
                id: index.toString(),
                name: hero.name,
                level: 1,
                skillNames: hero.skillNames,
                equipment: hero.equipment,
                pos: index + 1,
            })),
            soul: 0,
            layer: 1,
            maxLayer: 1,
            speed: 1,
        }
        console.log('saveData', saveData)
        setSaveData(saveData)
    }
    return saveData
}