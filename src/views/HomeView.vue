<template>
  <div>
    <h1>Benvingut a ConflictTracker</h1>
    <p style="color: #666; margin-bottom: 20px;">Seguiment de conflictes armats al món</p>

    <!-- PageCard amb slot: contingut estadístic -->
    <PageCard>
      <template #header>Estadístiques generals</template>

      <!-- v-if: mostra missatge de càrrega -->
      <div v-if="store.loading">Carregant dades...</div>

      <!-- v-if: mostra error si n'hi ha -->
      <div v-else-if="store.error" style="color: red;">{{ store.error }}</div>

      <!-- Computed: stats calculats des del store -->
      <div v-else class="stats">
        <div class="stat-box">
          <span class="num">{{ store.conflicts.length }}</span>
          <span class="label">Total conflictes</span>
        </div>
        <div class="stat-box actius">
          <span class="num">{{ store.totalActius }}</span>
          <span class="label">Actius</span>
        </div>
        <div class="stat-box congelats">
          <span class="num">{{ store.totalCongelats }}</span>
          <span class="label">Congelats</span>
        </div>
        <div class="stat-box finalitzats">
          <span class="num">{{ store.totalFinalitzats }}</span>
          <span class="label">Finalitzats</span>
        </div>
      </div>

      <template #footer>
        <RouterLink to="/conflicts">
          <button class="btn">Veure tots els conflictes →</button>
        </RouterLink>
      </template>
    </PageCard>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useConflictStore } from '../stores/conflictStore'
import PageCard from '../components/layout/PageCard.vue'

const store = useConflictStore()

onMounted(() => {
  store.carregarConflictes()
})
</script>

<style scoped>
h1 {
  margin-bottom: 6px;
}

.stats {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stat-box {
  background: #f0f0f0;
  border-radius: 8px;
  padding: 16px 24px;
  text-align: center;
  min-width: 120px;
}

.stat-box.actius { background: #ffe0e0; }
.stat-box.congelats { background: #d6eaf8; }
.stat-box.finalitzats { background: #e8e8e8; }

.num {
  display: block;
  font-size: 2rem;
  font-weight: bold;
}

.label {
  display: block;
  font-size: 0.85rem;
  color: #555;
  margin-top: 4px;
}

.btn {
  padding: 8px 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
