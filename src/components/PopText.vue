<template>
  <div class="pop-text">
    <!-- 多个飘字容器 循环渲染 -->
    <div
        v-for="item in wordList"
        :key="item.id"
        :style="{color: item.color}"
        class="damage-float">
      {{ item.word }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

let idSeed = 0;
// 飘字列表
const wordList = ref<{ id: number; word: string; color: string }[]>([]);


const handleDamage = (dmg: number) => {
  setWord(`-${dmg}`, '#ff0000');
}

const handleRecover = (value: number) => {
  setWord(`+${value}`, '#67c23a');
}

const handleSkill = (value: string) => {
  setWord(value, '#9370db');
}

const setWord = (word: string, color = 'white') => {
  // 每一次点击都新增一个飘字
  const item = {id: idSeed++, word: word, color};
  wordList.value.push(item);

  // 动画结束删掉当前项，不影响其他飘字
  setTimeout(() => {
    const idx = wordList.value.findIndex(x => x.id === item.id);
    if (idx > -1) wordList.value.splice(idx, 1);
  }, 1000);
}

defineExpose({
  handleDamage,
  handleRecover,
})
</script>

<style scoped>
.pop-text {
  width: 220px;
  padding: 20px;
  position: relative;
  user-select: none;
  overflow: hidden;
}

.damage-float {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000;
  animation: floatUp 1s ease-out forwards;
  pointer-events: none;
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-30px);
  }
}

</style>