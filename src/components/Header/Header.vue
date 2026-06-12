<script setup lang="ts">
import { ref } from 'vue';

interface Language {
  label: string;
  value: string;
}

const props = withDefaults(defineProps<{
  languages?: Language[];
  currentLanguage?: string;
  accountId?: string;
}>(), {
  languages: () => [
    { label: 'Chinese', value: 'zh' },
    { label: 'English', value: 'en' },
  ],
  currentLanguage: 'zh',
  accountId: '0167892617',
});

const emit = defineEmits<{
  languageChange: [value: string];
  profileClick: [];
  logout: [];
}>();

const langOpen = ref(false);
const accountOpen = ref(false);

const currentLangLabel = () =>
  props.languages.find((l) => l.value === props.currentLanguage)?.label ?? 'Chinese';

function toggleLang() {
  langOpen.value = !langOpen.value;
}

function selectLang(value: string) {
  emit('languageChange', value);
  langOpen.value = false;
}

function toggleAccount() {
  accountOpen.value = !accountOpen.value;
}

function handleProfile() {
  emit('profileClick');
  accountOpen.value = false;
}

function handleLogout() {
  emit('logout');
  accountOpen.value = false;
}
</script>

<template>
  <header class="header" role="banner">
    <div class="inner">
      <div class="logo">
        <img
          class="logo-img"
          src="/assets/header/logo.png"
          alt="ECBclub"
          width="106"
          height="32"
        />
      </div>

      <nav class="nav" aria-label="顶部导航">
        <!-- 语言选择 -->
        <div class="lang-switcher">
          <button
            class="lang-btn"
            type="button"
            :aria-expanded="langOpen"
            aria-haspopup="listbox"
            :aria-label="`当前语言: ${currentLangLabel()}`"
            @click="toggleLang"
          >
            <img
              class="lang-icon"
              src="/assets/header/icon-language.png"
              alt=""
              aria-hidden="true"
              width="16"
              height="16"
            />
            <span>{{ currentLangLabel() }}</span>
            <img
              class="chevron"
              :class="{ 'chevron-open': langOpen }"
              src="/assets/header/icon-chevron.png"
              alt=""
              aria-hidden="true"
              width="14"
              height="14"
            />
          </button>

          <ul v-if="langOpen" class="lang-dropdown" role="listbox" aria-label="选择语言">
            <li
              v-for="lang in languages"
              :key="lang.value"
              role="option"
              :aria-selected="lang.value === currentLanguage"
            >
              <button
                type="button"
                class="lang-option"
                :class="{ 'lang-option--active': lang.value === currentLanguage }"
                @click="selectLang(lang.value)"
              >
                {{ lang.label }}
              </button>
            </li>
          </ul>
        </div>

        <!-- 账号信息 -->
        <div class="account-wrap">
          <button
            class="account"
            type="button"
            :aria-expanded="accountOpen"
            aria-haspopup="menu"
            aria-label="账号信息"
            @click="toggleAccount"
          >
            <img
              class="account-icon"
              src="/assets/header/icon-account.png"
              alt=""
              aria-hidden="true"
              width="14"
              height="14"
            />
            <span class="account-id">{{ accountId }}</span>
            <img
              class="account-chevron"
              :class="{ 'chevron-open': accountOpen }"
              src="/assets/header/icon-chevron.png"
              alt=""
              aria-hidden="true"
              width="14"
              height="14"
            />
          </button>

          <ul v-if="accountOpen" class="account-dropdown" role="menu" aria-label="账号菜单">
            <li role="menuitem">
              <button class="account-option" type="button" @click="handleProfile">
                个人中心
              </button>
            </li>
            <li role="menuitem">
              <button class="account-option" type="button" @click="handleLogout">
                退出
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 60px;
  background: linear-gradient(
    91.16deg,
    rgba(255, 255, 255, 0.85) 48.05%,
    rgba(255, 238, 226, 0) 102.98%
  );
  border-bottom: 1px solid #E6E7EB;
  filter: drop-shadow(0px 1px 4px rgba(253, 253, 253, 0.25));
}

.inner {
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 0 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 106px;
  height: 32px;
  display: block;
}

.nav {
  display: flex;
  align-items: center;
  gap: 40px;
}

/* 语言切换 */
.lang-switcher {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 170%;
  letter-spacing: 0.182px;
  color: #000;
  padding: 0;
}

.lang-btn:hover {
  opacity: 0.7;
}

.lang-icon {
  width: 16px;
  height: 16px;
}

.chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.chevron-open {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 120px;
  background: #fff;
  border: 1px solid #EBEBEB;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 10;
}

.lang-option {
  width: 100%;
  padding: 10px 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #000;
  text-align: left;
  transition: background-color 0.15s ease;
}

.lang-option:hover {
  background: #FFF0E6;
}

.lang-option--active {
  color: #FF7E21;
}

/* 账号信息 */
.account-wrap {
  position: relative;
}

.account {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0;
}

.account:hover {
  opacity: 0.7;
}

.account-icon {
  width: 14px;
  height: 14px;
}

.account-id {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 170%;
  letter-spacing: 0.182px;
  color: #000;
}

.account-chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.account-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 120px;
  background: #fff;
  border: 1px solid #EBEBEB;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 10;
}

.account-option {
  width: 100%;
  padding: 10px 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #000;
  text-align: left;
  transition: background-color 0.15s ease;
}

.account-option:hover {
  background: #FFF0E6;
}
</style>
