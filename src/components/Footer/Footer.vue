<script setup lang="ts">
withDefaults(defineProps<{
  companyName?: string;
  email?: string;
  address?: string;
}>(), {
  companyName: 'Zhong Yun Supply Chain Management Pte Ltd',
  email: 'support@diit-operation-platform.com',
  address: 'B-26-3A, MENARA G-VESTOR TOWER, KOMPLEKS PAVILION AMPANG, 200, JALAN AMPANG, 50450 KUALA LUMPUR.',
});

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer" role="contentinfo">
    <div class="main">
      <div class="info-area">
        <div class="terms-column">
          <h4 class="section-title">条件与条款：</h4>
          <ul class="link-list">
            <li><a href="/privacy" class="link">隐私政策</a></li>
            <li><a href="/terms" class="link">服务条款</a></li>
            <li><a href="/returns" class="link">退换货政策</a></li>
          </ul>
        </div>

        <div class="contact-column">
          <h4 class="section-title">联系我们：</h4>
          <div class="contact-info">
            <div class="contact-row">
              <span class="label">名称：</span>
              <span>{{ companyName }}</span>
            </div>
            <div class="contact-row">
              <span class="label">邮箱：</span>
              <a :href="`mailto:${email}`" class="link">{{ email }}</a>
            </div>
            <div class="contact-row">
              <span class="label">地址：</span>
              <span class="address">{{ address }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="payment-icons" aria-label="应用下载">
        <a
          class="payment-icon"
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="在 Google Play 下载"
        >
          <img src="/assets/footer/google-play.png" alt="Google Play" />
        </a>
        <a
          class="payment-icon"
          href="https://apps.apple.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="在 App Store 下载"
        >
          <img src="/assets/footer/app-store.png" alt="App Store" />
        </a>
      </div>
    </div>

    <div class="copyright">
      <p>© 版权所有 {{ currentYear }}，ECBclub保留所有权利。</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background: #F6F6F6;
}

.main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 171px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 0;
}

.info-area {
  display: flex;
  align-items: flex-start;
  gap: 72px;
}

.terms-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  width: 87px;
}

.section-title {
  font-family: 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #000;
  white-space: nowrap;
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.link {
  font-family: 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #FF7E21;
  text-decoration: underline;
  transition: opacity 0.2s ease;
}

.link:hover {
  opacity: 0.7;
}

.contact-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.label {
  font-family: 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #888;
  white-space: nowrap;
  min-width: 42px;
}

.address {
  max-width: 418px;
  font-family: 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #000;
}

.payment-icons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: none;
}

.payment-icon {
  width: 136px;
  height: 40px;
}

.payment-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #E3E3E3;
  background: #F6F6F6;
}

.copyright p {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #888;
}
</style>
