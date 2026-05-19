<template>
  <top-bar title="招募"/>
  <div class="hiring">
    <div class="content">
      <div v-for="item in hiringList" class="item card">
        <div class="info">
          {{ item.name }}
          <div>Lv.1</div>
        </div>
        <a-button ghost @click="hiring(item)">招募（10000灵魂）</a-button>
      </div>
    </div>
    <a-button ghost @click="refreshBySoul">刷新（2000灵魂）</a-button>
  </div>
</template>
<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import {ref} from "vue";
import {Hero} from "@/common/entity/Role.ts";
import {HERO_BOOK} from "@/game/book/hero.ts";
import {getRandomThreeItems} from "@/common/utils";
import {allHeroes, buyBySoul} from "@/game/store.ts";
import {saveGame} from "@/common/storage/save.ts";
import type {IRole} from "@/common/interface";

const hiringList = ref<IRole[]>([])

const refreshBySoul = async () => {
  await buyBySoul(2000)
  refresh()
}

const refresh = () => {
  hiringList.value.splice(0)
  hiringList.value.push(...getRandomThreeItems(HERO_BOOK))
}

const hiring = async (role: IRole) => {
  await buyBySoul(10000)
  allHeroes.push(new Hero({...role, id: Date.now().toString()}))
  saveGame()
}

refresh()
</script>
<style scoped>
.hiring {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.content {
  width: 800px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
}
</style>