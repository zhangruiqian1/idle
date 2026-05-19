<template>
  <div class="top-bar">
    <div class="title blue">{{ title }}</div>
    <div class="end white">
      倍速
      <a-radio-group size="small" v-model:value="gameSpeed" button-style="solid">
        <a-radio-button v-for="item in [1, 2, 4, 8]" :value="item">{{ item }}倍速</a-radio-button>
      </a-radio-group>
      战斗模式
      <a-radio-group size="small" v-model:value="fightMode" button-style="solid">
        <a-radio-button v-for="item in FightMode" :value="item">{{ item }}</a-radio-button>
      </a-radio-group>
      <div class="pink">灵魂：{{ soul }}</div>
      <a-button ghost @click="onSave">保存游戏</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">

import {fightMode, gameSpeed, soul} from "@/game/store.ts";
import {saveGame} from "@/common/storage/save.ts";
import {message} from "ant-design-vue";
import {FightMode} from "@/common/enum";

const onSave = () => {
  saveGame()
  message.success('保存成功')
}
defineProps<{
  title: string
}>()
</script>

<style scoped>
.top-bar {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 4px;
}

.end {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 20px;
}
</style>