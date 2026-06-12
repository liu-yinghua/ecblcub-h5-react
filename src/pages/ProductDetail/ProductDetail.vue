<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';

defineProps<{
  id?: string;
}>();

const router = useRouter();

const productData = (history.state as any)?.product;

const name = productData?.name ?? 'Apple/苹果iPhone 17 Pro 256GB 银色 双卡双待手机';
const sellingPrice = productData?.sellingPrice ?? 'RM4683.92';
const buybackPrice = productData?.buybackPrice ?? 'RM3,747.14';
const mainImage = productData?.imageUrl ?? '/assets/products/iphone17.png';

const spec = ref('iPhone 17');
const quantity = ref(1);
const activeThumb = ref(0);

const thumbnails = [
  '/assets/products/thumb-1.png',
  '/assets/products/thumb-2.png',
  '/assets/products/thumb-3.png',
  '/assets/products/thumb-4.png',
];

const detailImages = [
  '/assets/products/detail-1.png',
  '/assets/products/detail-2.png',
];

function goBack() {
  router.back();
}

function handlePrev() {
  activeThumb.value = activeThumb.value > 0 ? activeThumb.value - 1 : thumbnails.length - 1;
}

function handleNext() {
  activeThumb.value = activeThumb.value < thumbnails.length - 1 ? activeThumb.value + 1 : 0;
}

function handleMinus() {
  quantity.value = Math.max(1, quantity.value - 1);
}

function handlePlus() {
  quantity.value++;
}

function handleShip() {
  console.log('实物邮寄:', name);
}

function handleRecycle() {
  console.log('回收:', name);
}
</script>

<template>
  <div class="page">
    <Header />

    <main class="main">
      <nav class="breadcrumb" aria-label="面包屑导航">
        <button class="breadcrumb-item breadcrumb--link" type="button" @click="goBack">
          商品列表
        </button>
        <svg
          class="breadcrumb-arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="breadcrumb-item breadcrumb--active">商品详情</span>
      </nav>

      <!-- 商品展示区 -->
      <div class="product-area">
        <div class="thumbnail-list" role="listbox" aria-label="商品缩略图">
          <button
            v-for="(src, idx) in thumbnails"
            :key="idx"
            type="button"
            role="option"
            class="thumbnail"
            :class="{ 'thumbnail--active': idx === activeThumb }"
            :aria-selected="idx === activeThumb"
            @click="activeThumb = idx"
          >
            <img :src="src" :alt="`商品图片 ${idx + 1}`" />
          </button>
        </div>

        <div class="main-image-wrap">
          <div class="main-image-bg">
            <img class="main-image" :src="mainImage" :alt="name" />
          </div>
          <button class="arrow-btn arrow-left" type="button" aria-label="上一张" @click="handlePrev">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
              <path d="M5 1L1 5L5 9" stroke="#272636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button class="arrow-btn arrow-right" type="button" aria-label="下一张" @click="handleNext">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
              <path d="M1 1L5 5L1 9" stroke="#272636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 商品信息区 -->
      <div class="info-area">
        <h1 class="product-name">{{ name }}</h1>

        <div class="price-row">
          <div class="price-item">
            <span class="price-value">{{ sellingPrice }}</span>
            <span class="price-label">售价</span>
          </div>
          <div class="price-divider">
            <svg width="36" height="2" viewBox="0 0 36 2" aria-hidden="true">
              <line x1="0" y1="1" x2="36" y2="1" stroke="#FF7E21" stroke-width="1" />
            </svg>
          </div>
          <div class="price-item">
            <span class="price-value price-buyback">{{ buybackPrice }}</span>
            <span class="price-label price-label-buyback">收回价</span>
          </div>
        </div>

        <div class="spec-row">
          <span class="spec-title">规格</span>
          <div class="spec-value">
            <span>{{ spec }}</span>
          </div>
        </div>

        <div class="action-row">
          <button class="action-btn" type="button" aria-label="实物邮寄" @click="handleShip">
            实物邮寄
          </button>
          <button class="action-btn" type="button" aria-label="回收" @click="handleRecycle">
            回收
          </button>
        </div>

        <div class="quantity-row">
          <span class="quantity-title">数量</span>
          <div class="quantity-control">
            <button class="quantity-btn" type="button" aria-label="减少" @click="handleMinus">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="3" y="7" width="10" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
            <span class="quantity-value">{{ quantity }}</span>
            <button class="quantity-btn" type="button" aria-label="增加" @click="handlePlus">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <section class="detail-section" aria-label="商品详情">
        <img
          v-for="(src, idx) in detailImages"
          :key="idx"
          class="detail-image"
          :src="src"
          :alt="`商品详情 ${idx + 1}`"
        />
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.page {
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 3693px;
  background: #fff;
}

.main {
  padding: 0 160px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-top: 83px;
  margin-bottom: 16px;
}

.breadcrumb-item {
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 125%;
  color: #888;
  background: none;
  border: none;
  padding: 0;
}

.breadcrumb--link {
  cursor: pointer;
  transition: color 0.2s ease;
}

.breadcrumb--link:hover {
  color: #FF7E21;
}

.breadcrumb--active {
  color: #000;
}

.breadcrumb-arrow {
  width: 16px;
  height: 16px;
}

/* 商品展示区 */
.product-area {
  display: flex;
  align-items: flex-start;
  gap: 26px;
  width: 626px;
  height: 480px;
  margin-bottom: 25px;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 120px;
  height: 480px;
  flex: none;
}

.thumbnail {
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  border: 1px solid #EBEBEB;
  padding: 0;
  background: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
  flex: none;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail--active {
  border-color: #FF7E21;
}

.main-image-wrap {
  position: relative;
  width: 480px;
  height: 480px;
  flex: none;
}

.main-image-bg {
  width: 480px;
  height: 480px;
  background: #F1F1F1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image {
  width: 275.68px;
  height: 328.78px;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 60px;
  border: none;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: box-shadow 0.2s ease;
}

.arrow-btn:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.arrow-left {
  left: 0;
  transform: translate(-50%, -50%);
}

.arrow-right {
  right: 0;
  transform: translate(50%, -50%);
}

/* 商品信息区 */
.info-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  left: 810px;
  top: 127px;
  width: 310px;
}

.product-name {
  width: 310px;
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 125%;
  color: #000;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 10px;
  width: 310px;
  height: 87px;
  background: #FFF0E6;
  border-radius: 6px;
}

.price-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.price-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 125%;
  color: #000;
}

.price-buyback {
  color: #FF7E21;
}

.price-label {
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #888;
}

.price-label-buyback {
  color: #FFB076;
}

.price-divider {
  display: flex;
  align-items: center;
  flex: none;
}

.spec-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.spec-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 165%;
  letter-spacing: 0.4px;
  color: #0F172A;
}

.spec-value {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 20px;
  gap: 10px;
  border: 1px solid #EBEBEB;
  border-radius: 6px;
}

.spec-value span {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 125%;
  color: #888;
}

.action-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.action-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 145px;
  height: 40px;
  background: #FF7E21;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 208%;
  color: #fff;
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background: #E56A1A;
}

.detail-section {
  width: 636px;
  margin-top: 25px;
  margin-left: 0;
}

.detail-image {
  width: 636px;
  display: block;
  object-fit: contain;
}

.quantity-row {
  display: none;
  align-items: center;
  gap: 20px;
}

.quantity-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 165%;
  letter-spacing: 0.4px;
  color: #0F172A;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-btn {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  width: 24px;
  height: 24px;
  border: 1px solid #EEE;
  border-radius: 6px;
  background: none;
  cursor: pointer;
  color: #000;
  transition: background-color 0.15s ease;
}

.quantity-btn:hover {
  background: #F5F5F5;
}

.quantity-value {
  width: 24px;
  height: 24px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 170%;
  text-align: center;
  letter-spacing: 0.2px;
  color: #000;
}
</style>
