import {ENEMY_BOOK} from "@/game/book/enemy.ts";
import {Enemy} from "@/common/entity/Role.ts";

export const getEnemyTeamByLayer = (layer: number): Enemy[] => {
    if (layer % 10 === 0) {
        return [
            new Enemy(ENEMY_BOOK[0]).levelUp(layer).setPos(2),
            new Enemy(ENEMY_BOOK[1]).levelUp(layer).setPos(5),
            new Enemy(ENEMY_BOOK[2]).levelUp(layer).setPos(8),
            new Enemy(ENEMY_BOOK[3]).levelUp(layer).setPos(6),
        ]
    } else {
        return [
            new Enemy(ENEMY_BOOK[0]).levelUp(layer).setPos(2),
            new Enemy(ENEMY_BOOK[1]).levelUp(layer).setPos(5),
            new Enemy(ENEMY_BOOK[2]).levelUp(layer).setPos(8),
        ]
    }
}

export const getSoulByLayer = (layer: number): number => {
    return layer * 100
}