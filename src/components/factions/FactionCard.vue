<template>
  <div class="faction-card">
    <strong>{{ faction.name }}</strong>
    <div v-if="faction.supporterCountries && faction.supporterCountries.length > 0" class="suport">
      <span>Recolzada per: </span>
      <span
        v-for="pais in faction.supporterCountries"
        :key="pais.id"
        class="pais-tag"
      >
        {{ pais.name }}
      </span>
    </div>
    <p v-else class="sense-suport">Sense països de suport</p>
  </div>
</template>

<script setup>
// Props: rep les dades de la facció des del component pare
defineProps({
  faction: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.faction-card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 8px;
}

.suport {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #555;
}

.pais-tag {
  background: #ddd;
  border-radius: 4px;
  padding: 2px 7px;
  margin-left: 5px;
  font-size: 0.8rem;
}

.sense-suport {
  color: #999;
  font-size: 0.85rem;
  margin-top: 4px;
}
</style>
