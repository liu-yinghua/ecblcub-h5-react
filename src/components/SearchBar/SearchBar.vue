<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  shipCount?: number;
  recycleCount?: number;
}>(), {
  shipCount: 0,
  recycleCount: 0,
});

const emit = defineEmits<{
  search: [keyword: string];
  viewList: [];
}>();

const keyword = ref('');

function handleSearch() {
  const trimmed = keyword.value.trim();
  if (trimmed) {
    emit('search', trimmed);
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleSearch();
  }
}
</script>

<template>
  <div class="container">
    <!-- 店铺信息（默认隐藏） -->
    <div class="shop-info">
      <div class="shop-avatar" />
      <div class="shop-text">
        <span class="shop-name">online shop 店铺名称</span>
        <span class="shop-desc">店铺简介线上商品兑换，简单几步，轻松换好物。</span>
      </div>
    </div>

    <!-- 统计 + 操作区 -->
    <div class="stats-row">
      <div class="stats">
        <span class="stat-item">
          <span class="stat-label">实物邮寄：</span>
          <span class="stat-value">{{ shipCount }}</span>
        </span>
        <span class="stat-item">
          <span class="stat-label">机构回收：</span>
          <span class="stat-value">{{ recycleCount }}</span>
        </span>
      </div>
      <button
        class="view-list-btn"
        type="button"
        aria-label="查看清单"
        @click="emit('viewList')"
      >
        查看清单
      </button>
    </div>

    <!-- 搜索框 -->
    <div class="search-box">
      <svg
        class="search-icon"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="9" cy="9" r="6" stroke="#999" stroke-width="1.5" />
        <path d="M13.5 13.5L17 17" stroke="#999" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <input
        v-model="keyword"
        class="search-input"
        type="text"
        aria-label="搜索本店商品"
        @keydown="handleKeyDown"
      />
      <button
        class="search-btn"
        type="button"
        aria-label="搜本店"
        @click="handleSearch"
      >
        搜本店
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 231px;
  width: 960px;
  height: 44px;
}

.shop-info {
  display: none;
}

.shop-avatar img {
  width: 64px;
  height: 64px;
  border: 1px solid #EBEBEB;
  border-radius: 12px;
  object-fit: cover;
}

.shop-text {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.shop-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 125%;
  color: #000;
}

.shop-desc {
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #888;
}

.stats-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 165%;
  letter-spacing: 0.4px;
  color: #888;
}

.stat-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 165%;
  letter-spacing: 0.4px;
  color: #000;
}

.view-list-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 128px;
  height: 36px;
  background: #fff;
  border: 1px solid #FF7E21;
  border-radius: 6px;
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 208%;
  color: #FF7E21;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.view-list-btn:hover {
  background: #FF7E21;
  color: #fff;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 4px 4px 4px 16px;
  gap: 8px;
  margin: 0 auto;
  width: 345px;
  height: 44px;
  background: #fff;
  border: 1px solid #EBEBEB;
  border-radius: 12px;
  flex: none;
}

.search-icon {
  flex: none;
  width: 20px;
  height: 20px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-size: 14px;
  color: #000;
  min-width: 0;
}

.search-input::placeholder {
  color: #888;
}

.search-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 80px;
  height: 36px;
  background: #FF7E21;
  border-radius: 6px;
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 208%;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-btn:hover {
  background: #e66d10;
}
</style>
