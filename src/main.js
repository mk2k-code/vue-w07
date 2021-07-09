import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import rules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// 自己寫的放最後
import $httpMessageState from '@/assets/util/pushMessageState';
import App from './App.vue';
import router from './router';
import toCurrency from '@/assets/util/toCurrency';
// import $httpMessageState from '@/assets/util/pushMessageState';
import { date, currency } from '@/assets/util/filters';

// ---vee-validate start---
Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});
// Activate the locale
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});
setLocale('zh_TW');
// ---vee-validate end---

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};
app.config.globalProperties.$toCurrency = toCurrency;
app.config.globalProperties.$httpMessageState = $httpMessageState;

app.component('Loading', Loading);
// vee-validate global component  全域註冊
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
