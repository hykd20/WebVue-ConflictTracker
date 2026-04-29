<template>
  <nav class="navbar">
    <span class="brand">ConflictTracker</span>
    <div class="links">
      <RouterLink to="/">Inici</RouterLink>
      <RouterLink to="/conflicts">Conflictes</RouterLink>
      <RouterLink to="/countries">Països</RouterLink>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  color: white;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-size: 1.2rem;
  font-weight: bold;
}

.links a {
  color: white;
  text-decoration: none;
  margin-left: 16px;
}

.links a:hover {
  text-decoration: underline;
}

.links a.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}
</style>
