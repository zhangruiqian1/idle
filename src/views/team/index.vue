<template>
  <top-bar title="编队"/>
  {{ cardCount }}
  <!-- 九宫格容器 -->
  <div class="grid-container">
    <!-- 遍历9个格子，渲染3x3布局 -->
    <div
        class="grid-item"
        v-for="(item, index) in gridList"
        :key="index"
        @drop="handleDrop($event, index)"
        @dragover="handleDragOver"
    >
      <!-- 1. 当前格子有卡片：渲染可拖拽卡片 + 删除按钮 -->
      <div
          v-if="item.hasCard"
          class="drag-card card"
          draggable="true"
          @dragstart="handleDragStart($event, index)">
        {{ item.role.name }}
        <!-- 新增：删除按钮 -->
        <div class="delete-btn" @click.stop="deleteCard(index)">×</div>
      </div>

      <!-- 2. 当前格子无卡片 + 未达到最大数量：渲染加号按钮 -->
      <div
          v-else-if="cardCount < maxCards"
          class="add-btn"
          @click="addCard(index)">
        +
      </div>
    </div>
  </div>
  <dark-modal ref="addModalRef" title="选择英雄" :visible="visibleAdd" @confirm="handleConfirm" @close="visibleAdd = false">
    <hero-list :roles="heroNotTeam" @item-click="onHeroClick"/>
  </dark-modal>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import TopBar from "@/components/TopBar.vue";
import {allHeroes} from "@/game/store.ts";
import {getSaveData, setSaveData} from "@/common/storage/save.ts";
import {loadFightTeam} from "@/game/preload.ts";
import DarkModal from "@/components/DarkModal.vue";
import HeroList from "@/components/HeroList.vue";
import type {Hero} from "@/common/entity/Role.ts";
import {message} from "ant-design-vue";

// 配置项
const maxCards = 5 // 最大卡片数量
// 九宫格数据：9个格子，每个格子存储是否有卡片、卡片ID
const gridList = ref<any[]>(
    Array(9).fill(0).map((_, idx) => ({
      id: idx,
      hasCard: false, // 是否有卡片
      role: null    // 卡片唯一标识
    }))
)

const cardCount = ref(0) // 当前卡片数量
const dragIndex = ref(0) // 记录拖拽的源格子索引
const addModalRef = ref()
const visibleAdd = ref(false)
const heroNotTeam = ref<Hero[]>([])
const selectedHero = ref<Hero | null>(null)
const selectedPos = ref(-1)

watch(allHeroes, (newVal) => {
  gridList.value.forEach(item => {
    newVal.forEach(hero => {
      if (hero.pos === item.id + 1) {
        item.hasCard = true
        item.role = hero
      }
    })
  })
  cardCount.value = gridList.value.filter(item => item.hasCard).length
}, {immediate: true, deep: false})

const onHeroClick = (index: number) => {
  console.log(index)
  selectedHero.value = heroNotTeam.value[index]
}

const handleConfirm = () => {
  if (!selectedHero.value) return message.warn('请选择英雄')
  gridList.value[selectedPos.value] = {
    hasCard: true,
    role: selectedHero.value,
    id: selectedPos.value
  }
  cardCount.value++
  save()
  visibleAdd.value = false
}

const save = () => {
  const saveData = getSaveData()
  console.log(saveData)
  saveData.heroes = saveData.heroes.map(hero => ({
    ...hero,
    pos: (hero.pos = gridList.value.find(item => item?.role?.id === hero.id)?.id ?? -1) + 1
  }))
  setSaveData(saveData)
  loadFightTeam()
}

// 1. 点击加号：添加卡片
const addCard = (index: number) => {
  // 数量达到上限，禁止添加
  if (cardCount.value >= maxCards) return
  visibleAdd.value = true
  heroNotTeam.value = allHeroes.filter(hero => hero.pos === 0)
  selectedPos.value = index
}

// 2. 开始拖拽：记录源格子索引
const handleDragStart = (e: any, index: number) => {
  dragIndex.value = index
  e.dataTransfer.effectAllowed = 'move'
}

// 3. 拖拽经过：必须阻止默认行为，才能触发drop
const handleDragOver = (e: Event) => {
  e.preventDefault()
}

// 4. 释放拖拽：处理移动/交换位置
const handleDrop = (e: Event, targetIndex: number) => {
  e.preventDefault()
  const sourceIndex = dragIndex.value
  // 无效拖拽：拖到自身 / 源格子无卡片
  if (sourceIndex === targetIndex || !gridList.value[sourceIndex].hasCard) return

  const sourceItem = gridList.value[sourceIndex] // 源格子数据
  const targetItem = gridList.value[targetIndex] // 目标格子数据

  // 情况1：目标格子为空 → 移动卡片
  if (!targetItem.hasCard) {
    targetItem.hasCard = true
    targetItem.role = sourceItem.role
    sourceItem.hasCard = false
    sourceItem.role = null
  }
  // 情况2：目标格子有卡片 → 交换位置
  else {
    const temp = {...sourceItem}
    sourceItem.hasCard = targetItem.hasCard
    sourceItem.role = targetItem.role
    targetItem.hasCard = temp.hasCard
    targetItem.role = temp.role
  }
  save()
}

// 新增：删除卡片
const deleteCard = (index: number) => {
  // 清空当前格子的卡片状态
  gridList.value[index].hasCard = false
  gridList.value[index].role = null
  // 卡片数量减1
  cardCount.value--
  save()
}
</script>

<style scoped>
/* 九宫格容器：3列网格布局 */
.grid-container {
  width: 600px;
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 20px auto;
}

/* 单个格子样式 */
.grid-item {
  width: 200px;
  height: 200px;
  border: 2px dashed #999;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.grid-item:hover {
  border-color: white;
}

/* 加号按钮 */
.add-btn {
  font-size: 80px;
  color: #999999;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}

.add-btn:hover {
  color: white;
}

/* 卡片样式 */
.drag-card {
  width: 180px;
  height: 180px;
  background-color: #666666;
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: move;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 给删除按钮定位 */
  position: relative;
}

/* 新增：删除按钮样式 */
.delete-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  background: #ff4d4f;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #ff7875;
}
</style>