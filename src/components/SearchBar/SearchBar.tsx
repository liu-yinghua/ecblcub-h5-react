import { useState, useCallback } from 'react';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  /** 实物邮寄数量 */
  shipCount?: number;
  /** 机构回收数量 */
  recycleCount?: number;
  /** 搜索回调 */
  onSearch?: (keyword: string) => void;
  /** 查看清单回调 */
  onViewList?: () => void;
}

/**
 * SearchBar — 搜索栏 + 店铺信息 + 统计 + 操作按钮
 */
export function SearchBar({
  shipCount = 0,
  recycleCount = 0,
  onSearch,
  onViewList,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  const handleSearch = useCallback(() => {
    const trimmed = keyword.trim();
    if (trimmed) {
      onSearch?.(trimmed);
    }
  }, [keyword, onSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <div className={styles.container}>
      {/* 店铺信息区域 (当前设计稿中为隐藏) */}
      <div className={styles.shopInfo}>
        <div className={styles.shopAvatar}>
          <img src="/assets/shop-placeholder.png" alt="" aria-hidden="true" />
        </div>
        <div className={styles.shopText}>
          <span className={styles.shopName}>online shop 店铺名称</span>
          <span className={styles.shopDesc}>店铺简介线上商品兑换，简单几步，轻松换好物。</span>
        </div>
      </div>

      {/* 统计 + 操作区 */}
      <div className={styles.statsRow}>
        <div className={styles.stats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>实物邮寄：</span>
            <span className={styles.statValue}>{shipCount}</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>机构回收：</span>
            <span className={styles.statValue}>{recycleCount}</span>
          </span>
        </div>
        <button
          className={styles.viewListBtn}
          onClick={onViewList}
          type="button"
          aria-label="查看清单"
        >
          查看清单
        </button>
      </div>

      {/* 搜索框 */}
      <div className={styles.searchBox}>
        <svg
          className={styles.searchIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="9" cy="9" r="6" stroke="#999" strokeWidth="1.5" />
          <path d="M13.5 13.5L17 17" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          className={styles.searchInput}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="搜索本店商品"
        />
        <button
          className={styles.searchBtn}
          onClick={handleSearch}
          type="button"
          aria-label="搜本店"
        >
          搜本店
        </button>
      </div>
    </div>
  );
}
