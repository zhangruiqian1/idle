<template>
  <div ref="cardRef" class="role-card">
    <div>
      {{ role.name }}
    </div>
    <div>
      Lv.{{ role.level }}
    </div>
    {{role.hp}}
    <hp-bar :current-hp="role.hp" :max-hp="role.raw.hp"/>
    <div class="pop-text">
      <pop-text ref="popTextRef" class="pop-text"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onUnmounted, ref, watch} from 'vue'
import {RoleState, RoleType} from "@/common/enum";
import HpBar from "@/components/HpBar.vue";
import type {Role} from "@/common/entity/Role.ts";
import PopText from "@/components/PopText.vue";

const props = defineProps<{
  role: Role
}>()

const cardRef = ref()
const popTextRef = ref()

const onAttackCallback = (role: Role, value: number) => {
  playAttack()
}

const onHurtCallback = (role: Role, value: number) => {
  console.log('受伤回调', `${props.role.name}-${props.role.id}`)
  popTextRef.value?.handleDamage(value)
  playHurt()
}

const onRecoverCallback = (role: Role, value: number) => {
  popTextRef.value?.handleRecover(value)
  playRecover()
}

watch(() => props.role, () => {
  props.role.setAttackCallback(onAttackCallback)
  props.role.setHurtCallback(onHurtCallback)
  props.role.setRecoverCallback(onRecoverCallback)
}, {immediate: true, deep: false})

onUnmounted(() => {
  props.role.removeAttackCallback(onAttackCallback)
  props.role.removeHurtCallback(onHurtCallback)
  props.role.removeRecoverCallback(onRecoverCallback)
})

// 清除所有动画类
const clearAllAnimate = () => {
  if (!cardRef.value) return
  cardRef.value.classList.remove('attack-ani-hero', 'attack-ani-enemy', 'hurt-ani-hero', 'hurt-ani-enemy', 'recover-ani', 'die-ani')
  // 重绘重置动画，支持连续点
  void cardRef.value.offsetWidth
}

// 攻击
const playAttack = () => {
  clearAllAnimate()
  if (!cardRef.value) return
  cardRef.value.classList.add(props.role.type === RoleType.Hero ? 'attack-ani-hero' : 'attack-ani-enemy')
}

// 受击
const playHurt = () => {
  clearAllAnimate()
  if (!cardRef.value) return
  cardRef.value.classList.add(props.role.type === RoleType.Hero ? 'hurt-ani-hero' : 'hurt-ani-enemy')
}

// 回复
const playRecover = () => {
  clearAllAnimate()
  if (!cardRef.value) return
  cardRef.value.classList.add('recover-ani')
}

// 死亡
const playDie = () => {
  clearAllAnimate()
  if (!cardRef.value) return
  cardRef.value.classList.add('die-ani')
}
</script>

<style scoped>

.role-card {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #666666;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transform: translate(0, 0) scale(1) rotate(0deg);
  opacity: 1;
  transition: all 0.3s ease;
  cursor: pointer;
  gap: 10px;
  padding: 4px;
  position: relative;
}

.role-card:hover {
  transform: scale(1.05);
}

.pop-text {
  width: 100%;
  position: absolute;
  top: 0;
}

/* 1. 攻击动画 向前冲刺放大 */
.attack-ani-hero {
  animation: heroAttackKey 0.5s ease forwards;
}

.attack-ani-enemy {
  animation: enemyAttackKey 0.5s ease forwards;
}

@keyframes heroAttackKey {
  0% {
    transform: translateX(0) scale(1);
  }
  40% {
    transform: translateX(40px) scale(1.1);
  }
  70% {
    transform: translateX(-5px) scale(1.02);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}

@keyframes enemyAttackKey {
  0% {
    transform: translateX(0) scale(1);
  }
  40% {
    transform: translateX(-40px) scale(1.1);
  }
  70% {
    transform: translateX(5px) scale(1.02);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}

/* 2. 受击动画 左右抖动 泛红 后退 */
.hurt-ani-hero {
  animation: heroHurtKey 0.6s ease forwards;
}

.hurt-ani-enemy {
  animation: enemyHurtKey 0.6s ease forwards;
}

@keyframes heroHurtKey {
  0% {
    transform: translateX(0);
    filter: brightness(1);
  }
  20% {
    transform: translateX(-15px);
    filter: brightness(1.3) hue-rotate(-20deg);
  }
  40% {
    transform: translateX(15px);
  }
  60% {
    transform: translateX(-8px);
  }
  80% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
    filter: brightness(1);
  }
}

@keyframes enemyHurtKey {
  0% {
    transform: translateX(0);
    filter: brightness(1);
  }
  20% {
    transform: translateX(15px);
    filter: brightness(1.3) hue-rotate(-20deg);
  }
  40% {
    transform: translateX(-15px);
  }
  60% {
    transform: translateX(8px);
  }
  80% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
    filter: brightness(1);
  }
}

/* 3. 回复动画 缓慢回弹上浮 */
.recover-ani {
  animation: recoverKey 0.7s ease forwards;
}

@keyframes recoverKey {
  0% {
    transform: translateY(15px) scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-8px) scale(1.03);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* 4. 死亡动画 下沉 旋转 透明消失 */
.die-ani {
  animation: dieKey 0.8s ease forwards;
}

@keyframes dieKey {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(40px) rotate(15deg);
    opacity: 0;
  }
}
</style>