<template>
  <div class="page-card">
    <!-- Slot per al títol (opcional) -->
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <!-- Slot per defecte: el contingut principal -->
    <div class="card-body">
      <slot />
    </div>

    <!-- Slot per al peu (opcional) -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 16px;
}

.card-header {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  font-size: 1.1rem;
  font-weight: bold;
}

.card-body {
  padding: 16px;
}

.card-footer {
  padding: 12px 16px;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
}
</style>
