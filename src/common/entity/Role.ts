import type {IRole, ISkill} from "@/common/interface";
import {game} from "@/game";
import {RoleState, RoleType} from "@/common/enum";
import {Skill} from "@/game/skill";
import {Skill_Book} from "@/game/book/skill.ts";
import type {ValueCallback} from "@/common/type";

export class Role implements IRole {
    id: string
    name: string
    hp: number
    atk: number
    def: number
    speed: number
    crit: number
    dodge: number
    hp_up: number;
    atk_up: number;
    def_up: number;
    speed_up: number;
    crit_up: number;
    dodge_up: number;
    pos: number
    level: number;
    skillNames: string[];
    skills: ISkill[];
    equipment: number[];
    type: RoleType;
    state: RoleState
    raw: IRole
    book: IRole
    skill: Skill

    onAttackCallbacks: ValueCallback[] = []
    onHurtCallbacks: ValueCallback[] = []
    onRecoverCallbacks: ValueCallback[] = []

    setAttackCallback(callback: ValueCallback) {
        this.onAttackCallbacks.push(callback)
    }

    setHurtCallback(callback: ValueCallback) {
        this.onHurtCallbacks.push(callback)
    }

    setRecoverCallback(callback: ValueCallback) {
        this.onRecoverCallbacks.push(callback)
    }

    removeAttackCallback(callback: ValueCallback) {
        this.onAttackCallbacks = this.onAttackCallbacks.filter(it => it !== callback)
    }

    removeHurtCallback(callback: ValueCallback) {
        this.onHurtCallbacks = this.onHurtCallbacks.filter(it => it !== callback)
    }

    removeRecoverCallback(callback: ValueCallback) {
        this.onRecoverCallbacks = this.onRecoverCallbacks.filter(it => it !== callback)
    }

    notifyAttack(role: Role, value: number, skill: ISkill) {
        this.onAttackCallbacks.forEach(callback => callback(role, value, skill))
    }

    notifyHurt(role: Role, value: number, skill: ISkill) {
        this.onHurtCallbacks.forEach(callback => callback(role, value, skill))
    }

    notifyRecover(role: Role, value: number, skill: ISkill) {
        this.onRecoverCallbacks.forEach(callback => callback(role, value, skill))
    }

    constructor(iRole: IRole) {
        this.id = iRole?.id ?? Date.now().toString()
        this.name = iRole.name;
        this.hp = iRole.hp;
        this.atk = iRole.atk;
        this.def = iRole.def;
        this.speed = iRole.speed;
        this.crit = iRole.crit;
        this.dodge = iRole.dodge;
        this.hp_up = iRole.hp_up;
        this.atk_up = iRole.atk_up;
        this.def_up = iRole.def_up;
        this.speed_up = iRole.speed_up;
        this.crit_up = iRole.crit_up;
        this.dodge_up = iRole.dodge_up;
        this.pos = iRole.pos ?? 0;
        this.level = iRole?.level ?? 1;
        this.skillNames = iRole.skillNames;
        this.skills = iRole.skillNames.map(it => Skill_Book[it]);
        this.equipment = iRole?.equipment ?? [];
        this.type = RoleType.Hero;
        this.state = RoleState.Idle;
        this.raw = iRole
        this.book = iRole
        this.skill = new Skill(this)
    }

    doSkill(skill: ISkill) {
        this.skill.doSkill(skill)
    }

    hurt(target: Role, value: number) {
        this.hp -= value
        if (this.hp <= 0) {
            this.die()
        }
    }

    die(): void {
        this.state = RoleState.Dead
        game.log(`${this.name}似了`)
    }

    levelUp(level: number): Role {
        this.level = level
        this.hp = this.book.hp + this.level * this.hp_up
        this.atk = this.book.atk + this.level * this.atk_up
        this.def = this.book.def + this.level * this.def_up
        this.speed = this.book.speed + this.level * this.speed_up
        this.crit = this.book.crit + this.level * this.crit_up
        this.dodge = this.book.dodge + this.level * this.dodge_up
        this.raw = {
            ...this.book,
            level: this.level,
            hp: this.hp,
            atk: this.atk,
            def: this.def,
            speed: this.speed,
            crit: this.crit,
            dodge: this.dodge,
            pos: this.pos
        }
        return this
    }

    upLevel() {
        console.log('this', this)
        this.level++
        this.levelUp(this.level)
    }

    setPos(pos: number): Role {
        this.pos = pos
        return this
    }
}

export class Hero extends Role {
    type = RoleType.Hero
}

export class Enemy extends Role {
    type = RoleType.Enemy
}
