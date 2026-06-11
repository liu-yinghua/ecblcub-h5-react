import styles from './Footer.module.css';

export interface FooterProps {
  /** 公司名称 */
  companyName?: string;
  /** 公司邮箱 */
  email?: string;
  /** 公司地址 */
  address?: string;
}

/**
 * Footer — 页脚组件
 * 布局: [条件与条款 | 联系我们] ← 171px → [支付图标×2]
 * 支付图标使用切图，放在 public/assets/footer/ 目录
 */
export function Footer({
  companyName = 'Zhong Yun Supply Chain Management Pte Ltd',
  email = 'support@diit-operation-platform.com',
  address = 'B-26-3A, MENARA G-VESTOR TOWER, KOMPLEKS PAVILION AMPANG, 200, JALAN AMPANG, 50450 KUALA LUMPUR.',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.main}>
        {/* 左侧：条款 + 联系 */}
        <div className={styles.infoArea}>
          {/* 条件与条款 */}
          <div className={styles.termsColumn}>
            <h4 className={styles.sectionTitle}>条件与条款：</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="/privacy" className={styles.link}>隐私政策</a>
              </li>
              <li>
                <a href="/terms" className={styles.link}>服务条款</a>
              </li>
              <li>
                <a href="/returns" className={styles.link}>退换货政策</a>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div className={styles.contactColumn}>
            <h4 className={styles.sectionTitle}>联系我们：</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactRow}>
                <span className={styles.label}>名称：</span>
                <span>{companyName}</span>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.label}>邮箱：</span>
                <a href={`mailto:${email}`} className={styles.link}>{email}</a>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.label}>地址：</span>
                <span className={styles.address}>{address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：应用下载（切图） */}
        <div className={styles.paymentIcons} aria-label="应用下载">
          <a
            className={styles.paymentIcon}
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="在 Google Play 下载"
          >
            <img src="/assets/footer/google-play.png" alt="Google Play" />
          </a>
          <a
            className={styles.paymentIcon}
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="在 App Store 下载"
          >
            <img src="/assets/footer/app-store.png" alt="App Store" />
          </a>
        </div>
      </div>

      {/* 版权信息 */}
      <div className={styles.copyright}>
        <p>© 版权所有 {currentYear}，ECBclub保留所有权利。</p>
      </div>
    </footer>
  );
}
