import type {Role} from "@/common/entity/Role.ts";
import {RoleType} from "@/common/enum";

export const getAttackPos = (current: Role, target: Role[]) => {
    const {pos, type} = current
    const targetPos = target.map(it => it.pos)
    if (type === RoleType.Hero) {
        switch (pos) {
            case 1:
            case 2:
            case 3:
                if (targetPos.includes(1)) return 1
                if (targetPos.includes(2)) return 2
                if (targetPos.includes(3)) return 3
                if (targetPos.includes(4)) return 4
                if (targetPos.includes(5)) return 5
                if (targetPos.includes(6)) return 6
                if (targetPos.includes(7)) return 7
                if (targetPos.includes(8)) return 8
                if (targetPos.includes(9)) return 9
                break;
            case 4:
            case 5:
            case 6:
                if (targetPos.includes(4)) return 4
                if (targetPos.includes(5)) return 5
                if (targetPos.includes(6)) return 6
                if (targetPos.includes(1)) return 1
                if (targetPos.includes(2)) return 2
                if (targetPos.includes(3)) return 3
                if (targetPos.includes(7)) return 7
                if (targetPos.includes(8)) return 8
                if (targetPos.includes(9)) return 9
                break;
            case 7:
            case 8:
            case 9:
                if (targetPos.includes(7)) return 7
                if (targetPos.includes(8)) return 8
                if (targetPos.includes(9)) return 9
                if (targetPos.includes(4)) return 4
                if (targetPos.includes(5)) return 5
                if (targetPos.includes(6)) return 6
                if (targetPos.includes(1)) return 1
                if (targetPos.includes(2)) return 2
                if (targetPos.includes(3)) return 3
                break;
        }
    }
    if (type === RoleType.Enemy) {
        switch (pos) {
            case 1:
            case 2:
            case 3:
                if (targetPos.includes(3)) return 3
                if (targetPos.includes(2)) return 2
                if (targetPos.includes(1)) return 1
                if (targetPos.includes(6)) return 6
                if (targetPos.includes(5)) return 5
                if (targetPos.includes(4)) return 4
                if (targetPos.includes(9)) return 9
                if (targetPos.includes(8)) return 8
                if (targetPos.includes(7)) return 7
                break;
            case 4:
            case 5:
            case 6:
                if (targetPos.includes(6)) return 6
                if (targetPos.includes(5)) return 5
                if (targetPos.includes(4)) return 4
                if (targetPos.includes(3)) return 3
                if (targetPos.includes(2)) return 2
                if (targetPos.includes(1)) return 1
                if (targetPos.includes(9)) return 9
                if (targetPos.includes(8)) return 8
                if (targetPos.includes(7)) return 7
                break;
            case 7:
            case 8:
            case 9:
                if (targetPos.includes(9)) return 9
                if (targetPos.includes(8)) return 8
                if (targetPos.includes(7)) return 7
                if (targetPos.includes(6)) return 6
                if (targetPos.includes(5)) return 5
                if (targetPos.includes(4)) return 4
                if (targetPos.includes(3)) return 3
                if (targetPos.includes(2)) return 2
                if (targetPos.includes(1)) return 1
                break;
        }
    }
}

export const delay = (time: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}

/**
 * 从数组中随机取出 3 个元素（允许重复）
 * @param arr 源数组
 * @returns 随机 3 个元素组成的新数组
 */
export const getRandomThreeItems = <T>(arr: T[]): T[] => {
    // 空数组直接返回空
    if (!arr || arr.length === 0) return [];

    const result: T[] = [];
    const len = arr.length;

    // 随机取 3 次
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * len);
        result.push(arr[randomIndex]);
    }

    return result;
}

/**
 * 深度克隆
 * @param target 源对象
 * @returns 克隆后的对象
 */
export const deepClone = <T>(target: T): T => {
    // 基础类型直接返回
    if (target === null || typeof target !== 'object') {
        return target;
    }

    // 日期
    if (target instanceof Date) {
        return new Date(target.getTime()) as unknown as T;
    }

    // 正则
    if (target instanceof RegExp) {
        return new RegExp(target.source, target.flags) as unknown as T;
    }

    // 数组
    if (Array.isArray(target)) {
        return target.map(item => deepClone(item)) as unknown as T;
    }

    // 普通对象
    const cloneObj = {} as T;
    Reflect.ownKeys(target).forEach(key => {
        (cloneObj as any)[key] = deepClone((target as any)[key]);
    });
    return cloneObj;
}