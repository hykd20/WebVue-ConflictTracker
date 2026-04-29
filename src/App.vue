<template>
  <div>
    <AppNavbar />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import AppNavbar from './components/layout/AppNavbar.vue'
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 0 16px;
}
</style>
