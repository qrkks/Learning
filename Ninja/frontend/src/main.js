import { createApp } from 'vue';
import './style.css'; // 引入全局样式
import App from './App.vue'; // 根组件
import { createRouter, createWebHistory } from 'vue-router'; // Vue Router 的核心 API

// 导入页面组件
import ProductDetailPage from './pages/ProductDetailPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ShoppingCartPage from './pages/ShoppingCartPage.vue';

// 定义路由规则
const routes = [
  { path: '/products', component: ProductsPage },
  { path: '/products/:id', component: ProductDetailPage },
  { path: '/cart', component: ShoppingCartPage }
];

// 创建路由器实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 Vite 提供的环境变量
  routes
});

// 创建 Vue 应用实例并使用路由器
const app = createApp(App);
app.use(router);
app.mount('#app');
