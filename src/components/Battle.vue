<template>
  <div class="battle" ref="battleEl">
    <div class="battle-container">
      <!-- 内层网格：负责倾斜 + 3x3布局 -->
      <div class="battle-box">
        <div
            class="battle-item"
            v-for="i in 9"
            :key="i"
            ref="leftBox">
        </div>
      </div>
      <div class="vs">VS</div>
      <div class="battle-box">
        <div
            class="battle-item"
            v-for="i in 9"
            :key="i"
            ref="rightBox">
        </div>
      </div>

    </div>
    <!-- 友方 -->
    <div
        class="left-point"
        v-for="item in heroTeam"
        :key="item.id"
        :style="getTermStyle(item, leftPoints)">
      <RoleCard :role="item"/>
    </div>
    <!-- 敌方 -->
    <div
        class="left-point"
        v-for="item in enemyTeam"
        :key="item.id"
        :style="getTermStyle(item, rightPoints)">
      <RoleCard :role="item"/>
    </div>
    <!--    <div-->
    <!--        class="right-point"-->
    <!--        v-for="(point, index) in rightPos"-->
    <!--        :key="index"-->
    <!--        :style="{ left: point.x + 'px', top: point.y + 'px' }">-->
    <!--      <img v-if="enemies.includes(index+1)" src="../assets/img/4.jpeg" alt=""/>-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import RoleCard from "@/components/RoleCard.vue";
import {heroTeam, enemyTeam} from "@/game/store.ts";
import type {IRole} from "@/common/interface/index.ts";

const leftBox = ref([])
const rightBox = ref([])
type Point = {
  x: number
  y: number
}
// 存储所有格子的中心坐标
const leftPoints = ref<Point[]>([])
const rightPoints = ref<Point[]>([])
const battleEl = ref();

const getTermStyle = (role: IRole, points: Point[]) => {
  if (!role.pos) return {}
  if (!points[role.pos - 1]) return {}
  return {
    left: points[role.pos - 1].x + 'px',
    top: points[role.pos - 1].y + 'px',
    zIndex: 999 + role.pos,
  }
}

// 计算并获取所有格子中心坐标
const getGridCenters = () => {
  // 清空旧数据
  leftPoints.value = []
  const battleRect = battleEl.value.getBoundingClientRect();

  leftBox.value.forEach((item: any) => {
    // 获取元素视觉真实位置（兼容CSS倾斜/变换）
    const rect = item.getBoundingClientRect()
    // 计算中心坐标
    const x = rect.left + rect.width / 2 - battleRect.left;
    const y = rect.top + rect.height / 2 - battleRect.top;

    leftPoints.value.push({
      x: Math.round(x),
      y: Math.round(y)
    })
  })
  rightBox.value.forEach((item: any) => {
    // 获取元素视觉真实位置（兼容CSS倾斜/变换）
    const rect = item.getBoundingClientRect()
    // 计算中心坐标
    const x = rect.left + rect.width / 2 - battleRect.left;
    const y = rect.top + rect.height / 2 - battleRect.top;

    rightPoints.value.push({
      x: Math.round(x),
      y: Math.round(y)
    })
  })

}
// DOM渲染完成后执行
onMounted(async () => {
  getGridCenters()

  // 监听窗口大小变化，自动更新坐标（适配响应式）
  window.addEventListener('resize', getGridCenters)
})
</script>

<style scoped>
.battle {
  position: relative;
}

.battle-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  //transform: skewX(-50deg) translateX(20%);
  gap: 20px;
}

.battle-box {
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 120px);
  grid-template-rows: repeat(3, 120px);
  gap: 8px;
}

.battle-item {
  background-color: rgb(255 255 255 / 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #1976d2;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
}

.battle-item:hover {
}

.left-point {
  position: absolute;
  width: 120px;
  height: 120px;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.left-point img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 10%;
  box-shadow: 0 0 10px rgb(255 0 38 / 0.28);
  transform: skewY(-14deg);
}

.right-point img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 10%;
  box-shadow: 0 0 10px rgb(255 0 38 / 0.28);
  transform: skewY(14deg);
}

.vs {
  font-size: 60px;
  font-weight: bold;
  color: rgb(255 255 255 / 0.3);
}
</style>