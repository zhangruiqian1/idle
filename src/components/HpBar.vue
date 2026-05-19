<template>
  <div class="hp-bar-wrap">
    <!-- 背景底板 -->
    <div class="hp-bar-bg">
      <!-- 血量填充 -->
      <div
          class="hp-bar-fill"
          :style="{ width: percent + '%' }"
      />
    </div>
    <!-- 血量文字 -->
    <div class="hp-bar-text">{{ currentHp }}/{{ maxHp }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentHp: number;
  maxHp: number;
}>();

// 计算血量百分比 限制0-100
const percent = computed(() => {
  let p = (props.currentHp / props.maxHp) * 100;
  return Math.max(0, Math.min(100, p));
});
</script>

<style scoped>
.hp-bar-wrap {
  width: 100%;
  height: 14px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  font-size: 8px;
}

/* 暗色底板 深灰黑 */
.hp-bar-bg {
  width: 100%;
  height: 100%;
  background: rgb(42 42 56 / 0.5);
}

/* 血量条 暗红渐变 平滑过渡 */
.hp-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #9b2226, #d63031);
  transition: width 0.3s ease;
}

/* 血量文字居中白色 */
.hp-bar-text {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  font-weight: 500;
}
</style>