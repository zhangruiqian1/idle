<template>
  <div class="list card">
    <div class="item"
         :class="activeIndex==index ? 'active' : ''"
         v-for="(item, index) in roles"
         :key="index"
         @click="heroClick(index)">
      <div class="name">{{ item.name }}</div>
      <a-tag v-if="item.pos !== 0" color="green">已上阵</a-tag>
      <div class="hp">Lv{{ item.level }}</div>
    </div>
    <div v-if="!roles?.length">
      <div class="empty">暂无数据</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Role} from "@/common/entity/Role.ts";

const props = defineProps<{
  roles: Role[]
  defaultIndex?: number
}>()

const activeIndex = ref(props.defaultIndex ?? -1)

const emit = defineEmits({
  itemClick: (index: number) => Function
})

const heroClick = (index: number) => {
  activeIndex.value = index
  emit('itemClick', index)
}

</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: #17233D;
  padding: 20px;

  .item {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #3C5078;
    cursor: pointer;
    border-left: 5px solid #3C5078;
  }

  .active {
    background-color: #212D51;
    border-left: 5px solid #67c23a;
  }
}
</style>