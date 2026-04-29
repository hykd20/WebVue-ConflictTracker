<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h1>Conflictes</h1>
      <RouterLink to="/conflicts/new">
        <button class="btn-nou">+ Nou conflicte</button>
      </RouterLink>
    </div>

    <!-- Component de filtre (usa v-model internament) -->
    <ConflictFilter />

    <!-- v-if: missatge de càrrega -->
    <div v-if="store.loading">Carregant...</div>

    <!-- v-else-if: missatge d'error -->
    <div v-else-if="store.error" style="color: red;">{{ store.error }}</div>

    <!-- v-else-if: llista buida -->
    <div v-else-if="store.conflictsFiltrats.length === 0" style="color: #999; text-align: center; padding: 40px;">
      No s'han trobat conflictes.
    </div>

    <!-- v-else + v-for: llista de conflictes filtrats -->
    <div v-else>
      <p style="color: #666; margin-bottom: 12px;">
        Mostrant {{ store.conflictsFiltrats.length }} de {{ store.conflicts.length }} conflictes
      </p>

      <!-- ConflictCard amb props i emits -->
      <ConflictCard
        v-for="conflict in store.conflictsFiltrats"
        :key="conflict.id"
        :conflict="conflict"
        @eliminar="store.eliminarConflicte($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useConflictStore } from '../stores/conflictStore'
import ConflictCard from '../components/conflicts/ConflictCard.vue'
import ConflictFilter from '../components/conflicts/ConflictFilter.vue'

const store = useConflictStore()

onMounted(() => {
  store.carregarConflictes()
})
</script>

<style scoped>
.btn-nou {
  padding: 8px 16px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
}
</style>
