import type {Role} from "@/common/entity/Role.ts";
import {RoleState, RoleType} from "@/common/enum";
import type {Skill} from "@/game/skill";

/**
 * 角色图鉴
 */
export interface IRole {
    id?: string
    name: string
    hp: number
    atk: number
    def: number
    speed: number
    crit: number
    dodge: number
    hp_up: number
    atk_up: number
    def_up: number
    speed_up: number
    crit_up: number
    dodge_up: number
    pos?: number
    level?: number
    skillNames: string[]
    skills?: ISkill[]
    equipment: number[]
    type?: RoleType
    state?: RoleState
}

export interface ISkill {
    skillName: string
    funcName: string
    round: number
    count: number
    ratio: number
    desc: string
}