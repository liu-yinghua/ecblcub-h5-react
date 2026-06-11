import { useState, useCallback } from 'react';
import styles from './Header.module.css';

export interface HeaderProps {
  /** 语言选项 */
  languages?: Array<{ label: string; value: string }>;
  /** 当前语言 */
  currentLanguage?: string;
  /** 语言切换回调 */
  onLanguageChange?: (lang: string) => void;
  /** 账号ID */
  accountId?: string;
  /** 个人中心点击回调 */
  onProfileClick?: () => void;
  /** 退出登录回调 */
  onLogout?: () => void;
}

/**
 * Header — 顶部导航栏
 * 包含 Logo、语言选择、账号信息
 * 切图放在 public/assets/header/ 目录
 */
export function Header({
  languages = [
    { label: 'Chinese', value: 'zh' },
    { label: 'English', value: 'en' },
  ],
  currentLanguage = 'zh',
  onLanguageChange,
  accountId = '0167892617',
  onProfileClick,
  onLogout,
}: HeaderProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const currentLangLabel =
    languages.find((l) => l.value === currentLanguage)?.label ?? 'Chinese';

  const handleLangToggle = useCallback(() => {
    setLangOpen((prev) => !prev);
  }, []);

  const handleLangSelect = useCallback(
    (value: string) => {
      onLanguageChange?.(value);
      setLangOpen(false);
    },
    [onLanguageChange],
  );

  const handleAccountToggle = useCallback(() => {
    setAccountOpen((prev) => !prev);
  }, []);

  const handleProfile = useCallback(() => {
    onProfileClick?.();
    setAccountOpen(false);
  }, [onProfileClick]);

  const handleLogout = useCallback(() => {
    onLogout?.();
    setAccountOpen(false);
  }, [onLogout]);

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        {/* Logo 整体切图，106×32 */}
        <div className={styles.logo}>
          <img
            className={styles.logoImg}
            src="/assets/header/logo.png"
            alt="ECBclub"
            width={106}
            height={32}
          />
        </div>

        {/* 右侧功能区 */}
        <nav className={styles.nav} aria-label="顶部导航">
          {/* 语言选择 */}
          <div className={styles.langSwitcher}>
            <button
              className={styles.langBtn}
              onClick={handleLangToggle}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label={`当前语言: ${currentLangLabel}`}
              type="button"
            >
              {/* 语言图标（切图） */}
              <img
                className={styles.langIcon}
                src="/assets/header/icon-language.png"
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
              />
              <span>{currentLangLabel}</span>
              {/* 下拉箭头（切图） */}
              <img
                className={`${styles.chevron} ${langOpen ? styles.chevronOpen : ''}`}
                src="/assets/header/icon-chevron.png"
                alt=""
                aria-hidden="true"
                width={14}
                height={14}
              />
            </button>

            {langOpen && (
              <ul className={styles.langDropdown} role="listbox" aria-label="选择语言">
                {languages.map((lang) => (
                  <li key={lang.value} role="option" aria-selected={lang.value === currentLanguage}>
                    <button
                      className={`${styles.langOption} ${lang.value === currentLanguage ? styles.langOptionActive : ''}`}
                      onClick={() => handleLangSelect(lang.value)}
                      type="button"
                    >
                      {lang.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 账号信息 */}
          <div className={styles.accountWrap}>
            <button
              className={styles.account}
              onClick={handleAccountToggle}
              aria-expanded={accountOpen}
              aria-haspopup="menu"
              aria-label="账号信息"
              type="button"
            >
              {/* 账号图标（切图） */}
              <img
                className={styles.accountIcon}
                src="/assets/header/icon-account.png"
                alt=""
                aria-hidden="true"
                width={14}
                height={14}
              />
              <span className={styles.accountId}>{accountId}</span>
              {/* 下拉箭头（切图） */}
              <img
                className={`${styles.accountChevron} ${accountOpen ? styles.chevronOpen : ''}`}
                src="/assets/header/icon-chevron.png"
                alt=""
                aria-hidden="true"
                width={14}
                height={14}
              />
            </button>

            {accountOpen && (
              <ul className={styles.accountDropdown} role="menu" aria-label="账号菜单">
                <li role="menuitem">
                  <button
                    className={styles.accountOption}
                    onClick={handleProfile}
                    type="button"
                  >
                    个人中心
                  </button>
                </li>
                <li role="menuitem">
                  <button
                    className={styles.accountOption}
                    onClick={handleLogout}
                    type="button"
                  >
                    退出
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
