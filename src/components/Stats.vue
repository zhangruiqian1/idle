<template>
  <div class="stats card">
    <a-menu
        v-model:selectedKeys="current"
        mode="horizontal"
        theme="dark">
      <a-menu-item v-for="item in menus" :key="item">
        {{ item }}
      </a-menu-item>
    </a-menu>
    <div class="speed-content content" v-if="current[0] === '速度'">
      <div class="line" v-for="item in actionQueue">
        <div class="label">{{ item.name }}</div>
        <div class="value">{{ item.speed }}</div>
      </div>
    </div>
    <div class="content" v-if="current[0] === '伤害'">
      开发中......
    </div>
    <div class="content" v-if="current[0] === '承伤'">
      开发中......
    </div>
    <div class="content" v-if="current[0] === '治疗'">
      开发中......
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {actionQueue} from "@/game/store.ts";

const menus = ['速度', '伤害', '承伤', '治疗']
const current = ref<string[]>(['速度']);
</script>

<style scoped>
.stats {
  display: flex;
  flex-direction: column;
}

.content {
  width: 100%;
  padding: 10px;
  overflow-y: scroll;
  height: 100%;
}

.speed-content {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #212D51;
  }
}
</style>