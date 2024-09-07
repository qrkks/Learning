<template>
  <div class="flex gap-2 items-center justify-center">
    <router-link to="/">Home</router-link>
    <router-link to="/products">Products</router-link>
    <router-link to="/products/:id">Product</router-link>
    <router-link to="/cart">Cart</router-link>
  </div>
  <h1 class=" text-blue-500">Hello World from Vite</h1>
  <router-view class="text-red-500"></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
