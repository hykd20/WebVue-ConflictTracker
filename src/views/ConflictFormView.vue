<template>
  <div>
    <RouterLink to="/conflicts">← Tornar a la llista</RouterLink>

    <h1 style="margin: 16px 0;">{{ esEdicio ? 'Editar conflicte' : 'Nou conflicte' }}</h1>

    <PageCard>
      <template #header>{{ esEdicio ? 'Edita les dades' : 'Omple les dades' }}</template>

      <!-- v-if: carregant (en mode edició) -->
      <div v-if="loading">Carregant...</div>

      <div v-else>
        <!-- v-model: captura totes les dades del formulari -->
        <div class="camp">
          <label>Nom del conflicte *</label>
          <input v-model="formulari.name" type="text" placeholder="Ex: Guerra de Siria" />
        </div>

        <div class="camp">
          <label>Data d'inici *</label>
          <input v-model="formulari.startDate" type="text" placeholder="Ex: 2011-03-15" />
        </div>

        <div class="camp">
          <label>Estat *</label>
          <select v-model="formulari.status">
            <option value="">-- Selecciona un estat --</option>
            <option value="ACTIVE">Actiu</option>
            <option value="FROZEN">Congelat</option>
            <option value="ENDED">Finalitzat</option>
          </select>
        </div>

        <div class="camp">
          <label>Descripció</label>
          <textarea v-model="formulari.description" rows="4" placeholder="Descriu el conflicte..."></textarea>
        </div>

        <!-- Selecció de països (multi-select) -->
        <div class="camp">
          <label>Països implicats</label>
          <div v-if="countryStore.loading">Carregant països...</div>
          <div v-else class="checkbox-list">
            <label
              v-for="pais in countryStore.countries"
              :key="pais.id"
              class="checkbox-item"
            >
              <!-- v-model amb array de IDs seleccionats -->
              <input
                type="checkbox"
                :value="pais.id"
                v-model="formulari.countryIds"
              />
              {{ pais.name }}
            </label>
          </div>
        </div>

        <div v-if="errorMissatge" style="color: red; margin-bottom: 10px;">{{ errorMissatge }}</div>

        <button class="btn btn-guardar" @click="guardar" :disabled="guardant">
          {{ guardant ? 'Guardant...' : (esEdicio ? 'Actualitzar' : 'Crear conflicte') }}
        </button>
      </div>
    </PageCard>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getConflictById, createConflict, updateConflict } from '../services/api'
import { useCountryStore } from '../stores/countryStore'
import PageCard from '../components/layout/PageCard.vue'

const route = useRoute()
const router = useRouter()
const countryStore = useCountryStore()

// Computed: si l'URL té :id, estem en mode edició
const esEdicio = computed(() => !!route.params.id)

// v-model: totes les dades del formulari en un objecte reactiu
const formulari = ref({
  name: '',
  startDate: '',
  status: '',
  description: '',
  countryIds: []
})

const loading = ref(false)
const guardant = ref(false)
const errorMissatge = ref('')

onMounted(async () => {
  // Carregar la llista de països per als checkboxes
  countryStore.carregarPaisos()

  // Si és edició, carregar les dades actuals del conflicte
  if (esEdicio.value) {
    loading.value = true
    try {
      const res = await getConflictById(route.params.id)
      const c = res.data
      formulari.value = {
        name: c.name,
        startDate: c.startDate,
        status: c.status,
        description: c.description,
        countryIds: c.countries ? c.countries.map(p => p.id) : []
      }
    } catch (e) {
      errorMissatge.value = 'Error carregant les dades'
    } finally {
      loading.value = false
    }
  }
})

async function guardar() {
  // Validació bàsica
  if (!formulari.value.name || !formulari.value.status) {
    errorMissatge.value = 'El nom i l\'estat són obligatoris'
    return
  }

  guardant.value = true
  errorMissatge.value = ''

  try {
    if (esEdicio.value) {
      await updateConflict(route.params.id, formulari.value)
    } else {
      await createConflict(formulari.value)
    }
    router.push('/conflicts')
  } catch (e) {
    errorMissatge.value = 'Error guardant el conflicte'
  } finally {
    guardant.value = false
  }
}
</script>

<style scoped>
.camp {
  margin-bottom: 16px;
}

.camp label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.camp input,
.camp select,
.camp textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
}

.checkbox-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  background: #f0f0f0;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-guardar {
  background-color: #27ae60;
  color: white;
}

.btn-guardar:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
