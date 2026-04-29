<template>
  <div>
    <RouterLink to="/conflicts">← Tornar a la llista</RouterLink>

    <!-- v-if: carregant -->
    <div v-if="loading" style="margin-top: 20px;">Carregant conflicte...</div>

    <!-- v-if: error -->
    <div v-else-if="error" style="color: red; margin-top: 20px;">{{ error }}</div>

    <!-- v-if: dades carregades -->
    <div v-else-if="conflict" style="margin-top: 20px;">

      <!-- PageCard amb slots per estructurar la informació -->
      <PageCard>
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>{{ conflict.name }}</span>
            <!-- v-bind: classe dinàmica per l'estat -->
            <span :class="['badge', classeEstat]">{{ etiquetaEstat }}</span>
          </div>
        </template>

        <!-- Dades principals, jerarquitzades per importància -->
        <p><strong>Data d'inici:</strong> {{ conflict.startDate }}</p>
        <p style="margin-top: 10px;"><strong>Descripció:</strong></p>
        <p style="color: #444; margin-top: 4px;">{{ conflict.description }}</p>

        <!-- Països implicats -->
        <div style="margin-top: 16px;">
          <strong>Països implicats:</strong>
          <div v-if="conflict.countries && conflict.countries.length > 0" style="margin-top: 6px;">
            <span
              v-for="pais in conflict.countries"
              :key="pais.id"
              class="pais-tag"
            >
              {{ pais.name }} ({{ pais.code }})
            </span>
          </div>
          <p v-else style="color: #999;">Sense països assignats</p>
        </div>

        <template #footer>
          <RouterLink :to="`/conflicts/${conflict.id}/edit`">
            <button class="btn btn-editar">Editar conflicte</button>
          </RouterLink>
        </template>
      </PageCard>

      <!-- Faccions -->
      <PageCard>
        <template #header>Faccions ({{ conflict.factions?.length || 0 }})</template>
        <div v-if="conflict.factions && conflict.factions.length > 0">
          <FactionCard
            v-for="faction in conflict.factions"
            :key="faction.id"
            :faction="faction"
          />
        </div>
        <p v-else style="color: #999;">No hi ha faccions registrades</p>
      </PageCard>

      <!-- Esdeveniments -->
      <PageCard>
        <template #header>Esdeveniments ({{ conflict.events?.length || 0 }})</template>
        <div v-if="conflict.events && conflict.events.length > 0">
          <EventCard
            v-for="event in conflict.events"
            :key="event.id"
            :event="event"
          />
        </div>
        <p v-else style="color: #999;">No hi ha esdeveniments registrats</p>
      </PageCard>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getConflictById } from '../services/api'
import PageCard from '../components/layout/PageCard.vue'
import FactionCard from '../components/factions/FactionCard.vue'
import EventCard from '../components/events/EventCard.vue'

// Ruta dinàmica: agafa l'id de l'URL (/conflicts/:id)
const route = useRoute()
const conflict = ref(null)
const loading = ref(false)
const error = ref(null)

// Computed: classe CSS dinàmica
const classeEstat = computed(() => {
  if (!conflict.value) return ''
  if (conflict.value.status === 'ACTIVE') return 'badge-actiu'
  if (conflict.value.status === 'FROZEN') return 'badge-congelat'
  return 'badge-finalitzat'
})

// Computed: etiqueta llegible de l'estat
const etiquetaEstat = computed(() => {
  if (!conflict.value) return ''
  if (conflict.value.status === 'ACTIVE') return '🔴 Actiu'
  if (conflict.value.status === 'FROZEN') return '🔵 Congelat'
  return '⚫ Finalitzat'
})

onMounted(async () => {
  loading.value = true
  try {
    const res = await getConflictById(route.params.id)
    conflict.value = res.data
  } catch (e) {
    error.value = 'No s\'ha pogut carregar el conflicte'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: bold;
}

.badge-actiu { background-color: #ffe0e0; color: #c0392b; }
.badge-congelat { background-color: #d6eaf8; color: #2471a3; }
.badge-finalitzat { background-color: #e8e8e8; color: #555; }

.pais-tag {
  display: inline-block;
  background: #eee;
  border-radius: 4px;
  padding: 3px 10px;
  margin-right: 6px;
  margin-top: 4px;
  font-size: 0.85rem;
}

.btn {
  padding: 6px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-editar { background-color: #f39c12; color: white; }
</style>
