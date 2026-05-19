<template>
  <div class="app-container">
    <!-- 左侧菜单 -->
    <div class="sidebar">
      <a-menu
          mode="inline"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          :style="{ height: '100%', borderRight: 0 }"
      >
        <!-- 绑定点击事件，手动跳转路由 -->
        <a-menu-item
            v-for="item in routes"
            :key="item.path"
            @click="toPage(item.path)"
            class="menu-item"
        >
          <div class="menu-title">
            <template v-if="item.meta?.title === '爬塔'">
              {{ item.meta?.title }}（第{{ layer }}层）
            </template>
            <template v-else>
              {{ item.meta?.title }}
            </template>
          </div>
        </a-menu-item>
      </a-menu>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {layer} from "@/game/store.ts";

const router = useRouter()
const route = useRoute()

// 过滤路由（只保留菜单）
const routes = router.options.routes.filter(item => {
  return item.meta && item.meta.title
})

// 菜单选中状态
const selectedKeys = ref<string[]>([])

const toPage = (path: string) => {
  router.push(path)
}

// 监听路由，自动高亮菜单（刷新/手动跳转也生效）
watch(
    () => route.path,
    (val: string) => {
      selectedKeys.value = [val]
    },
    {immediate: true}
)
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.sidebar {
  width: 220px;
}

.content {
  flex: 1;
  padding: 0 20px;
  overflow: auto;
}

</style>