import { useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';
import type { ProductCardProps } from '@/components/ProductCard';
import { ProductDetailPage } from '@/pages/ProductDetail';
import styles from './ProductList.module.css';

/** 示例商品数据 — 实际使用时替换为 API 数据 */
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

export function ProductListPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductCardProps | null>(null);

  const shipCount = useMemo(
    () => MOCK_PRODUCTS.filter((p) => p.onShip).length,
    [],
  );
  const recycleCount = useMemo(
    () => MOCK_PRODUCTS.filter((p) => p.onRecycle).length,
    [],
  );

  const handleSearch = (keyword: string) => {
    // TODO: 接入搜索 API
    console.log('搜索:', keyword);
  };

  const handleViewList = () => {
    // TODO: 跳转清单页
    console.log('查看清单');
  };

  const handleProductClick = (product: ProductCardProps) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  // 如果选中了商品，显示详情页
  if (selectedProduct) {
    return (
      <ProductDetailPage
        name={selectedProduct.name}
        sellingPrice={selectedProduct.sellingPrice}
        buybackPrice={selectedProduct.buybackPrice}
        mainImage={selectedProduct.imageUrl}
        onShip={() => console.log('实物邮寄:', selectedProduct.name)}
        onRecycle={() => console.log('回收:', selectedProduct.name)}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* 面包屑 */}
        <nav className={styles.breadcrumb} aria-label="面包屑导航">
          <span className={`${styles.breadcrumbItem} ${styles.breadcrumbActive}`}>
            商品列表
          </span>
        </nav>

        {/* 搜索栏 + 统计 */}
        <div className={styles.toolbar}>
          <SearchBar
            shipCount={shipCount}
            recycleCount={recycleCount}
            onSearch={handleSearch}
            onViewList={handleViewList}
          />
        </div>

        {/* 商品网格 */}
        <section className={styles.productGrid} aria-label="商品列表">
          {MOCK_PRODUCTS.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              onProductClick={() => handleProductClick(product)}
              onShip={() => console.log('实物邮寄:', product.name)}
              onRecycle={() => console.log('回收:', product.name)}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
