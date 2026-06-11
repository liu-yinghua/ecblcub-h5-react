import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './ProductDetail.module.css';

export interface ProductDetailProps {
  /** 商品名称 */
  name?: string;
  /** 售价 */
  sellingPrice?: string;
  /** 收回价 */
  buybackPrice?: string;
  /** 当前规格 */
  spec?: string;
  /** 数量 */
  quantity?: number;
  /** 缩略图列表 */
  thumbnails?: string[];
  /** 主图 */
  mainImage?: string;
  /** 详情图片 */
  detailImages?: string[];
  /** 实物邮寄回调 */
  onShip?: () => void;
  /** 回收回调 */
  onRecycle?: () => void;
  /** 返回上一页回调 */
  onBack?: () => void;
}

export function ProductDetailPage({
  name = 'Apple/苹果iPhone 17 Pro 256GB 银色 双卡双待手机',
  sellingPrice = 'RM4683.92',
  buybackPrice = 'RM3,747.14',
  spec = 'iPhone 17',
  quantity: initialQuantity = 1,
  thumbnails = [
    '/assets/products/thumb-1.png',
    '/assets/products/thumb-2.png',
    '/assets/products/thumb-3.png',
    '/assets/products/thumb-4.png',
  ],
  mainImage = '/assets/products/iphone17-detail.png',
  detailImages = [
    '/assets/products/detail-1.png',
    '/assets/products/detail-2.png',
  ],
  onShip,
  onRecycle,
  onBack,
}: ProductDetailProps) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(initialQuantity);

  const handlePrev = useCallback(() => {
    setActiveThumb((prev) => (prev > 0 ? prev - 1 : thumbnails.length - 1));
  }, [thumbnails.length]);

  const handleNext = useCallback(() => {
    setActiveThumb((prev) => (prev < thumbnails.length - 1 ? prev + 1 : 0));
  }, [thumbnails.length]);

  const handleMinus = useCallback(() => {
    setQuantity((prev) => Math.max(1, prev - 1));
  }, []);

  const handlePlus = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* 面包屑 */}
        <nav className={styles.breadcrumb} aria-label="面包屑导航">
          <button
            className={`${styles.breadcrumbItem} ${styles.breadcrumbLink}`}
            onClick={onBack}
            type="button"
          >
            商品列表
          </button>
          <svg
            className={styles.breadcrumbArrow}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`${styles.breadcrumbItem} ${styles.breadcrumbActive}`}>
            商品详情
          </span>
        </nav>

        {/* 商品展示区 */}
        <div className={styles.productArea}>
          {/* 左侧：缩略图列表 */}
          <div className={styles.thumbnailList} role="listbox" aria-label="商品缩略图">
            {thumbnails.map((src, idx) => (
              <button
                key={idx}
                className={`${styles.thumbnail} ${idx === activeThumb ? styles.thumbnailActive : ''}`}
                onClick={() => setActiveThumb(idx)}
                aria-selected={idx === activeThumb}
                role="option"
                type="button"
              >
                <img src={src} alt={`商品图片 ${idx + 1}`} />
              </button>
            ))}
          </div>

          {/* 主图 */}
          <div className={styles.mainImageWrap}>
            <div className={styles.mainImageBg}>
              <img
                className={styles.mainImage}
                src={mainImage}
                alt={name}
              />
            </div>
            {/* 左箭头 */}
            <button
              className={`${styles.arrowBtn} ${styles.arrowLeft}`}
              onClick={handlePrev}
              aria-label="上一张"
              type="button"
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
                <path d="M5 1L1 5L5 9" stroke="#272636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* 右箭头 */}
            <button
              className={`${styles.arrowBtn} ${styles.arrowRight}`}
              onClick={handleNext}
              aria-label="下一张"
              type="button"
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
                <path d="M1 1L5 5L1 9" stroke="#272636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* 商品信息区 */}
        <div className={styles.infoArea}>
          {/* 商品名称 */}
          <h1 className={styles.productName}>{name}</h1>

          {/* 价格区域 */}
          <div className={styles.priceRow}>
            <div className={styles.priceItem}>
              <span className={styles.priceValue}>{sellingPrice}</span>
              <span className={styles.priceLabel}>售价</span>
            </div>
            <div className={styles.priceDivider}>
              <svg width="36" height="2" viewBox="0 0 36 2" aria-hidden="true">
                <line x1="0" y1="1" x2="36" y2="1" stroke="#FF7E21" strokeWidth="1" />
              </svg>
            </div>
            <div className={styles.priceItem}>
              <span className={`${styles.priceValue} ${styles.priceBuyback}`}>{buybackPrice}</span>
              <span className={`${styles.priceLabel} ${styles.priceLabelBuyback}`}>收回价</span>
            </div>
          </div>

          {/* 规格 */}
          <div className={styles.specRow}>
            <span className={styles.specTitle}>规格</span>
            <div className={styles.specValue}>
              <span>{spec}</span>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className={styles.actionRow}>
            <button
              className={styles.actionBtn}
              onClick={onShip}
              type="button"
              aria-label="实物邮寄"
            >
              实物邮寄
            </button>
            <button
              className={styles.actionBtn}
              onClick={onRecycle}
              type="button"
              aria-label="回收"
            >
              回收
            </button>
          </div>

          {/* 数量选择（默认隐藏） */}
          <div className={styles.quantityRow}>
            <span className={styles.quantityTitle}>数量</span>
            <div className={styles.quantityControl}>
              <button className={styles.quantityBtn} onClick={handleMinus} type="button" aria-label="减少">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="3" y="7" width="10" height="2" rx="1" fill="currentColor" />
                </svg>
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button className={styles.quantityBtn} onClick={handlePlus} type="button" aria-label="增加">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 商品详情图 */}
        <section className={styles.detailSection} aria-label="商品详情">
          {detailImages.map((src, idx) => (
            <img
              key={idx}
              className={styles.detailImage}
              src={src}
              alt={`商品详情 ${idx + 1}`}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
