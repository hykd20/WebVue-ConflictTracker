<template>
  <div class="event-card">
    <p><strong>📅 {{ event.eventDate }}</strong></p>
    <p>📍 {{ event.location }}</p>
    <p class="desc">{{ event.description }}</p>
  </div>
</template>

<script setup>
// Props: rep les dades de l'esdeveniment des del component pare
defineProps({
  event: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.event-card {
  background: #f9f9f9;
  border-left: 4px solid #3498db;
  padding: 10px 14px;
  margin-bottom: 8px;
  border-radius: 0 6px 6px 0;
}

.event-card p {
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.desc {
  color: #555;
}
</style>
