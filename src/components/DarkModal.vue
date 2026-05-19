<template>
  <!-- 遮罩层 -->
  <div
      v-if="visible"
      class="dark-modal-mask"
      @click.self="handleClose"
  >
    <!-- 弹框容器 -->
    <div class="dark-modal-container">
      <!-- 头部 -->
      <div class="dark-modal-header">
        <span class="dark-modal-title">{{ title }}</span>
        <button
            class="dark-modal-close"
            @click="handleClose"
        >
          ×
        </button>
      </div>

      <!-- 内容区域（支持插槽） -->
      <div class="dark-modal-body">
        <slot></slot>
      </div>

      <!-- 底部按钮 -->
      <div
          v-if="showFooter"
          class="dark-modal-footer"
      >
        <button
            class="dark-modal-btn cancel"
            @click="handleClose"
        >
          取消
        </button>
        <button
            class="dark-modal-btn confirm"
            @click="handleConfirm"
        >
          确认
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// 接收参数
const props = defineProps({
  // 控制显示隐藏
  visible: {
    type: Boolean,
    default: false
  },
  // 弹框标题
  title: {
    type: String,
    default: '提示'
  },
  // 是否显示底部按钮
  showFooter: {
    type: Boolean,
    default: true
  }
})

// 触发事件
const emit = defineEmits(['close', 'confirm'])

// 关闭
const handleClose = () => {
  emit('close')
}

// 确认
const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
/* 遮罩层 */
.dark-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: maskFade 0.2s ease;
}

/* 遮罩动画 */
@keyframes maskFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 弹框容器 */
.dark-modal-container {
  width: 90%;
  max-width: 480px;
  background: #1e1e2f;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  color: #fff;
  overflow: hidden;
  animation: modalZoom 0.25s ease;
}

/* 弹框缩放动画 */
@keyframes modalZoom {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 头部 */
.dark-modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark-modal-title {
  font-size: 16px;
  font-weight: 500;
}

/* 关闭按钮 */
.dark-modal-close {
  background: none;
  border: none;
  color: #aaa;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
}

.dark-modal-close:hover {
  color: #fff;
}

/* 内容区域 */
.dark-modal-body {
  padding: 20px;
  min-height: 60px;
  line-height: 1.6;
}

/* 底部 */
.dark-modal-footer {
  padding: 12px 20px;
  border-top: 1px solid #333;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 按钮通用 */
.dark-modal-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

/* 取消按钮 */
.dark-modal-btn.cancel {
  background: #2d2d3f;
  color: #ccc;
}

.dark-modal-btn.cancel:hover {
  background: #3a3a4f;
  color: #fff;
}

/* 确认按钮 */
.dark-modal-btn.confirm {
  background: #4a6cf7;
  color: #fff;
}

.dark-modal-btn.confirm:hover {
  background: #3a5ce7;
}
</style>