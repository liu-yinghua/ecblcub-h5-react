<script setup lang="ts">
export interface ProductCardProps {
  imageUrl: string;
  imageAlt: string;
  name: string;
  sellingPrice: string;
  buybackPrice: string;
}

defineProps<ProductCardProps>();

const emit = defineEmits<{
  ship: [];
  recycle: [];
  productClick: [];
}>();
</script>

<template>
  <article class="card" :aria-label="`商品: ${name}`">
    <button
      class="image-wrapper"
      type="button"
      :aria-label="`查看 ${name} 详情`"
      @click="emit('productClick')"
    >
      <img
        class="image"
        :src="imageUrl"
        :alt="imageAlt"
        loading="lazy"
      />
    </button>

    <div class="info">
      <button
        class="name-btn"
        type="button"
        :title="name"
        @click="emit('productClick')"
      >
        <h3 class="name">{{ name }}</h3>
      </button>

      <div class="price-box">
        <div class="price-group">
          <span class="price-value">{{ sellingPrice }}</span>
          <span class="price-label">售价</span>
        </div>
        <div class="divider" aria-hidden="true" />
        <div class="price-group">
          <span class="price-value buyback-price">{{ buybackPrice }}</span>
          <span class="price-label buyback-label">收回价</span>
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-primary" type="button" aria-label="实物邮寄" @click="emit('ship')">
          实物邮寄
        </button>
        <button class="btn btn-primary" type="button" aria-label="回收" @click="emit('recycle')">
          回收
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 470px;
  min-height: 180px;
  background: #fff;
  border: 1px solid #EBEBEB;
  border-radius: 12px;
  overflow: hidden;
}

.image-wrapper {
  flex: none;
  width: 180px;
  min-height: 180px;
  align-self: stretch;
  background: #F1F1F1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px 0 0 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.image-wrapper:hover {
  opacity: 0.85;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 12px;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  gap: 19px;
  height: 100%;
  min-width: 0;
}

.name-btn {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;
}

.name-btn:hover .name {
  color: #FF7E21;
}

.name {
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 125%;
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;
}

.price-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 11px;
  background: #FFF0E6;
  border-radius: 6px;
}

.price-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100px;
}

.price-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 125%;
  color: #000;
}

.buyback-price {
  color: #FF7E21;
}

.price-label {
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #888;
}

.buyback-label {
  color: #FFB076;
}

.divider {
  width: 1px;
  height: 36px;
  background: #FF7E21;
  opacity: 0.3;
  flex: none;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 120px;
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

.btn-primary:hover {
  background: #e66d10;
}
</style>
