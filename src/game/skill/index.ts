import type {Role} from "@/common/entity/Role.ts";
import {RoleState, RoleType} from "@/common/enum";
import type {ISkill} from "@/common/interface";
import {getAttackPos} from "@/common/utils";
import {enemyTeam, heroTeam} from "@/game/store.ts";
import {game} from "@/game";

export class Skill {
    mine: Role

    constructor(mine: Role) {
        this.mine = mine
    }

    getSkill(name: string): (skill: ISkill) => void {
        return this[name as keyof this] as ((skill: ISkill) => void)
    }

    doSkill(skill: ISkill) {
        console.log(skill.skillName)
        this.getSkill(skill.funcName).call(this, skill)
    }

    recoverSome(skill: ISkill) {
        const targetTeam = this.getMineTeam()
        this.handleRecoverSome(targetTeam, skill)
    }

    handleRecoverSome(roles: Role[], skill: ISkill) {
        this.mine.state = RoleState.Attack
        roles.sort((a, b) => a.hp - b.hp)
            .slice(0, skill.count)
            .forEach(role => {
                role.state = RoleState.Recover
                const value = Math.round(this.mine.atk * skill.ratio)
                role.hp = Math.round(Math.min(role.hp + value, role.raw.hp))
                role.notifyRecover(role, value, skill)
                this.showRecoverLog(this.mine, value, skill)
            })
    }

    attack(skill: ISkill) {
        const targetTeam = this.getTargetTeam()
        const targetPos = getAttackPos(this.mine, targetTeam)
        const targetRole = targetTeam.find(it => it.pos === targetPos)
        if (!targetRole) return
        this.handleAttackSome([targetRole], skill)
    }

    attackSome(skill: ISkill) {
        const targetTeam = this.getTargetTeam()
        this.handleAttackSome(targetTeam, skill)
    }

    handleAttackSome(roles: Role[], skill: ISkill) {
        this.mine.state = RoleState.Attack
        roles.slice(0, skill.count)
            .forEach(role => {
                role.state = RoleState.Hurt
                const damage = Math.round(Math.max(this.mine.atk * skill.ratio - role.def, 0))
                role.hurt(this.mine, damage)
                this.mine.notifyAttack(role, damage, skill)
                role.notifyHurt(this.mine, damage, skill)
                this.showAttackLog(role, damage, skill)
            })
    }

    showAttackLog(role: Role, value: number, skill: ISkill) {
        switch (this.mine.type) {
            case RoleType.Hero:
                game.log(`<span class="blue">${this.mine.name}</span>对<span class="red">${role.name}</span>释放<span class="pink">${skill.skillName}</span>，造成<span class="purple">${value}</span>点伤害`)
                break;
            case RoleType.Enemy:
                game.log(`<span class="red">${this.mine.name}</span>对<span class="blue">${role.name}</span>释放<span class="pink">${skill.skillName}</span>，造成<span class="purple">${value}</span>点伤害`)
                break;
        }
    }

    showRecoverLog(role: Role, value: number, skill: ISkill) {
        switch (this.mine.type) {
            case RoleType.Hero:
                game.log(`<span class="blue">${this.mine.name}</span>对<span class="blue">${role.name}</span>释放<span class="pink">${skill.skillName}</span>，造成<span class="green">${value}</span>点治疗`)
                break;
            case RoleType.Enemy:
                game.log(`<span class="red">${this.mine.name}</span>对<span class="red">${role.name}</span>释放<span class="pink">${skill.skillName}</span>，造成<span class="green">${value}</span>点治疗`)
                break;
        }
    }

    getMineTeam(): Role[] {
        switch (this.mine.type) {
            case RoleType.Hero: {
                return heroTeam
            }
            case RoleType.Enemy: {
                return enemyTeam
            }
        }
    }

    getTargetTeam(): Role[] {
        switch (this.mine.type) {
            case RoleType.Hero: {
                return enemyTeam
            }
            case RoleType.Enemy: {
                return heroTeam
            }
        }
    }

}
