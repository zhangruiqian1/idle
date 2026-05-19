<template>
  <div class="grid">
    <div class="item card" v-for="item in 12" @click="onGridClick">
      空
    </div>
  </div>
</template>

<script setup lang="ts">
import {message} from "ant-design-vue";

const onGridClick = () => {
  message.info('开发中');
}
</script>

<style scoped>
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

.item {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>