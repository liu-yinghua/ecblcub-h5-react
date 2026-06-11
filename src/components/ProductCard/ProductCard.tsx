import styles from './ProductCard.module.css';

export interface ProductCardProps {
  /** 商品图片URL */
  imageUrl: string;
  /** 商品图片alt文字 */
  imageAlt: string;
  /** 商品名称 */
  name: string;
  /** 售价（格式：RM x,xxx.xx） */
  sellingPrice: string;
  /** 收回价（格式：RM x,xxx.xx） */
  buybackPrice: string;
  /** 实物邮寄点击回调 */
  onShip?: () => void;
  /** 回收点击回调 */
  onRecycle?: () => void;
  /** 点击商品图片或名称跳转详情回调 */
  onProductClick?: () => void;
}

/**
 * ProductCard — 商品卡片组件
 * 显示商品图片、名称、售价/收回价对比、操作按钮
 */
export function ProductCard({
  imageUrl,
  imageAlt,
  name,
  sellingPrice,
  buybackPrice,
  onShip,
  onRecycle,
  onProductClick,
}: ProductCardProps) {
  return (
    <article className={styles.card} aria-label={`商品: ${name}`}>
      {/* 商品图片 */}
      <button
        className={styles.imageWrapper}
        onClick={onProductClick}
        type="button"
        aria-label={`查看 ${name} 详情`}
      >
        <img
          className={styles.image}
          src={imageUrl}
          alt={imageAlt}
          loading="lazy"
        />
      </button>

      {/* 商品信息 */}
      <div className={styles.info}>
        {/* 商品名称 */}
        <button
          className={styles.nameBtn}
          onClick={onProductClick}
          type="button"
          title={name}
        >
          <h3 className={styles.name}>{name}</h3>
        </button>

        {/* 价格区域 */}
        <div className={styles.priceBox}>
          {/* 售价 */}
          <div className={styles.priceGroup}>
            <span className={styles.priceValue}>{sellingPrice}</span>
            <span className={styles.priceLabel}>售价</span>
          </div>

          {/* 分隔线 */}
          <div className={styles.divider} aria-hidden="true" />

          {/* 收回价 */}
          <div className={styles.priceGroup}>
            <span className={`${styles.priceValue} ${styles.buybackPrice}`}>
              {buybackPrice}
            </span>
            <span className={`${styles.priceLabel} ${styles.buybackLabel}`}>
              收回价
            </span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onShip}
            type="button"
            aria-label="实物邮寄"
          >
            实物邮寄
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onRecycle}
            type="button"
            aria-label="回收"
          >
            回收
          </button>
        </div>
      </div>
    </article>
  );
}
