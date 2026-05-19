import {Enemy, Hero, type Role} from "@/common/entity/Role.ts";
import {delay, getAttackPos} from "@/common/utils";
import {RoleState, RoleType} from "@/common/enum";
import {enemyTeam, gameSpeed, heroTeam, round} from "@/game/store.ts";
import {Skill_Book} from "@/game/book/skill.ts";

export const attackBehavior = async (role: Role) => {
    if (!role) return
    if (role.state === RoleState.Dead) return;
    switch (role.type) {
        case RoleType.Hero:
            await heroBehavior(role)
            break;
        case RoleType.Enemy:
            await enemyBehavior(role)
            break;
    }
}

const heroBehavior = async (hero: Hero) => {
    const targetPos = getAttackPos(hero, enemyTeam)
    if (!targetPos) return

    const targetEnemy = enemyTeam.find(it => it.pos === targetPos)
    if (!targetEnemy) return
    for (const skill of hero.skills) {
        if (round.value % skill.round === 0 || skill.round === 0) {
            // 每次攻击耗时1秒
            await delay(1000 / gameSpeed.value)
            hero.doSkill(skill)
        }
    }
    if (targetEnemy.state === RoleState.Dead) {
        enemyTeam.splice(enemyTeam.indexOf(targetEnemy), 1)
    }
}

const enemyBehavior = async (enemy: Enemy) => {
    const targetPos = getAttackPos(enemy, heroTeam)
    if (!targetPos) return

    const targetHero = heroTeam.find(it => it.pos === targetPos)
    if (!targetHero) return
    for (const skill of enemy.skills) {
        if (round.value % skill.round === 0 || skill.round === 0) {
            // 每次攻击耗时1秒
            await delay(1000 / gameSpeed.value)
            enemy.doSkill(skill)
        }
    }

    if (targetHero.state === RoleState.Dead) {
        heroTeam.splice(heroTeam.indexOf(targetHero), 1)
    }
}