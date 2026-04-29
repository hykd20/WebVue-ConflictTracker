<template>
  <div class="filtres">
    <!-- v-model: captura el text del cercador -->
    <input
      v-model="store.cercador"
      type="text"
      placeholder="Cerca per nom..."
      class="input-cerca"
    />

    <!-- v-model: captura el filtre d'estat -->
    <select v-model="store.filtreEstat" class="select-estat">
      <option value="TOTS">Tots els estats</option>
      <option value="ACTIVE">Actius</option>
      <option value="FROZEN">Congelats</option>
      <option value="ENDED">Finalitzats</option>
    </select>
  </div>
</template>

<script setup>
import { useConflictStore } from '../../stores/conflictStore'

const store = useConflictStore()
</script>

<style scoped>
.filtres {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.input-cerca {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
}

.select-estat {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
}
</style>
