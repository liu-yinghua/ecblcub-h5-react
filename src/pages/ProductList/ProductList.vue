<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import ProductCard from '@/components/ProductCard/ProductCard.vue';
import type { ProductCardProps } from '@/components/ProductCard/ProductCard.vue';

const router = useRouter();

const MOCK_PRODUCTS: ProductCardProps[] = [
  {
    imageUrl: '/assets/products/iphone17.png',
    imageAlt: 'Apple iPhone 17 Pro 256GB 银色',
    name: 'Apple/苹果iPhone 17 Pro 256GB 银色 双卡双待手机',
    sellingPrice: 'RM4683.92',
    buybackPrice: 'RM3,747.14',
  },
  {
    imageUrl: '/assets/products/nike-shoes.png',
    imageAlt: '耐克NIKE女子休闲鞋',
    name: '耐克NIKE女子休闲鞋薄底鞋 FIELD GENERAL运动鞋HQ7397-001银黑',
    sellingPrice: 'RM248.41',
    buybackPrice: 'RM198.73',
  },
  {
    imageUrl: '/assets/products/lego.png',
    imageAlt: '乐高FIFA世界杯奖杯',
    name: '乐高43020FIFA世界杯奖杯积木足球大力神杯拼装玩具',
    sellingPrice: 'RM205.07',
    buybackPrice: 'RM164.06',
  },
  {
    imageUrl: '/assets/products/lotion.png',
    imageAlt: '松山油脂柚子身体乳',
    name: '松山油脂柚子身体乳300ml滋润补水保湿不油腻润肤乳官方正品日本原装进口',
    sellingPrice: 'RM55.31',
    buybackPrice: 'RM44.25',
  },
  {
    imageUrl: '/assets/products/lululemon.png',
    imageAlt: 'lululemon女士运动短袖',
    name: 'lululemon丨Swiftly Tech 女士运动短袖 T 恤 2.0 *Race LW3FQHS 石板灰/白',
    sellingPrice: 'RM305.83',
    buybackPrice: 'RM244.66',
  },
];

const shipCount = computed(() => 0); // TODO: 接入 API
const recycleCount = computed(() => 0);

function handleSearch(keyword: string) {
  console.log('搜索:', keyword);
}

function handleViewList() {
  console.log('查看清单');
}

function handleProductClick(product: ProductCardProps, index: number) {
  router.push({ name: 'product-detail', params: { id: String(index) }, state: { product } });
}

function handleShip(product: ProductCardProps) {
  console.log('实物邮寄:', product.name);
}

function handleRecycle(product: ProductCardProps) {
  console.log('回收:', product.name);
}
</script>

<template>
  <div class="page">
    <Header />

    <main class="main">
      <nav class="breadcrumb" aria-label="面包屑导航">
        <span class="breadcrumb-item breadcrumb--active">商品列表</span>
      </nav>

      <div class="toolbar">
        <SearchBar
          :ship-count="shipCount"
          :recycle-count="recycleCount"
          @search="handleSearch"
          @view-list="handleViewList"
        />
      </div>

      <section class="product-grid" aria-label="商品列表">
        <ProductCard
          v-for="(product, index) in MOCK_PRODUCTS"
          :key="index"
          v-bind="product"
          @product-click="handleProductClick(product, index)"
          @ship="handleShip(product)"
          @recycle="handleRecycle(product)"
        />
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}

.main {
  flex: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 160px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 24px;
  margin-bottom: 24px;
}

.breadcrumb-item {
  font-family: 'Alibaba PuHuiTi', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 125%;
  color: #888;
}

.breadcrumb--active {
  color: #000;
}

.toolbar {
  margin-bottom: 28px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 470px);
  gap: 20px 16px;
  padding-bottom: 60px;
}

@media (max-width: 1100px) {
  .main {
    padding: 0 24px;
  }
  .product-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    justify-items: center;
  }
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
