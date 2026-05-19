<template>
  <div ref="logBoxRef" class="logcat card">
    <div class="log" v-for="log in logs" v-html="log"></div>
  </div>
</template>
<script setup lang="ts">
import {game} from "@/game";
import {nextTick, ref} from "vue";

const logs = ref<string[]>([])
const logBoxRef = ref()

game.onLog((msg: string) => {
  logs.value.push(msg)
  if (logs.value.length > 200) {
    logs.value = logs.value.slice(-200)
  }
  scrollToBottom()
})
// 每次添加日志后调用这个函数
const scrollToBottom = async () => {
  await nextTick()
  const el = logBoxRef.value
  if (el) {
    el.scrollTop = el.scrollHeight
  }
}
</script>
<style scoped>
.logcat {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
  padding: 10px;
  border-radius: 10px;
  overflow-y: scroll;
  color: #AFB9C3;
}

.log {
  padding: 4px 8px;
  font-size: 16px;
  display: flex;
  gap: 4px;
}

</style>