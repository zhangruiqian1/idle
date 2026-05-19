import type {ISkill} from "@/common/interface";

export const Skill_Book: Record<string, ISkill> = {
    '打击': {
        skillName: '打击',
        funcName: 'attack',
        round: 0,
        count: 1,
        ratio: 1,
        desc: '每1回合对敌方单体造成100%攻击力的伤害。',
    },
    '旋风斩': {
        skillName: '旋风斩',
        funcName: 'attackSome',
        round: 3,
        count: 9,
        ratio: 0.8,
        desc: '每3回合对敌方全体造成80%攻击力的伤害。',
    },
    '弱点打击': {
        skillName: '弱点打击',
        funcName: 'attack',
        round: 3,
        count: 1,
        ratio: 3.5,
        desc: '每3回合对敌方单体造成400%攻击力的伤害。',
    },
    '恢复': {
        skillName: '恢复',
        funcName: 'recoverSome',
        round: 3,
        count: 9,
        ratio: 0.5,
        desc: '每3回合恢复我方全体80%攻击力的血量。',
    },
}