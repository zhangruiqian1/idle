import type {Role} from "@/common/entity/Role.ts";
import type {ISkill} from "@/common/interface";

export type SaveDataType = {
    heroes: {
        id: string
        name: string
        level: number
        skillNames: string[]
        equipment: any[]
        pos: number
    }[]
    soul: number
    layer: number
    maxLayer: number
    speed: number
}

export type ValueCallback = (
    role: Role,
    value: number,
    skill?: ISkill,
) => void

