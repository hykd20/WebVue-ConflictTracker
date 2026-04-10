<template>
  <div>
    <h1 style="margin-bottom: 20px;">Països</h1>

    <!-- PageCard amb slot per crear un nou país -->
    <PageCard>
      <template #header>Afegir nou país</template>

      <div class="fila">
        <!-- v-model: formulari inline -->
        <input v-model="nouNom" type="text" placeholder="Nom del país" class="input" />
        <input v-model="nouCodi" type="text" placeholder="Codi (ex: ES)" class="input curt" />
        <button @click="afegirPais" class="btn btn-afegir">Afegir</button>
      </div>

      <div v-if="store.error" style="color: red; margin-top: 8px;">{{ store.error }}</div>
    </PageCard>

    <!-- Llista de països -->
    <PageCard>
      <template #header>Llista de països ({{ store.countries.length }})</template>

      <!-- v-if: carregant -->
      <div v-if="store.loading">Carregant...</div>

      <!-- v-if: llista buida -->
      <div v-else-if="store.countries.length === 0" style="color: #999;">
        No hi ha països registrats encara.
      </div>

      <!-- v-for: llista de països -->
      <div v-else>
        <div
          v-for="pais in store.countries"
          :key="pais.id"
          class="pais-fila"
        >
          <span><strong>{{ pais.code }}</strong> — {{ pais.name }}</span>
          <!-- Emit implícit via store directament -->
          <button @click="store.eliminarPais(pais.id)" class="btn btn-eliminar">🗑</button>
        </div>
      </div>
    </PageCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCountryStore } from '../stores/countryStore'
import PageCard from '../components/layout/PageCard.vue'

const store = useCountryStore()

// v-model: estat local del formulari inline
const nouNom = ref('')
const nouCodi = ref('')

onMounted(() => {
  store.carregarPaisos()
})

async function afegirPais() {
  if (!nouNom.value || !nouCodi.value) return
  await store.crearPais({ name: nouNom.value, code: nouCodi.value })
  nouNom.value = ''
  nouCodi.value = ''
}
</script>

<style scoped>
.fila {
  display: flex;
  gap: 10px;
  align-items: center;
}

.input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  flex: 1;
}

.input.curt {
  max-width: 90px;
  flex: none;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-afegir { background-color: #27ae60; color: white; }
.btn-eliminar { background-color: #e74c3c; color: white; }

.pais-fila {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 4px;
  border-bottom: 1px solid #eee;
}

.pais-fila:last-child {
  border-bottom: none;
}
</style>
