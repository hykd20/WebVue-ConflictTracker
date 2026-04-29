<template>
  <div class="conflict-card">
    <div class="card-top">
      <h3>{{ conflict.name }}</h3>
      <!-- v-bind: classe CSS dinàmica segons l'estat -->
      <span :class="['badge', classeEstat]">{{ etiquetaEstat }}</span>
    </div>

    <p class="data">Inici: {{ conflict.startDate }}</p>
    <p class="desc">{{ conflict.description }}</p>

    <div v-if="conflict.countries && conflict.countries.length > 0" class="paisos">
      <strong>Països implicats:</strong>
      <!-- v-for per mostrar països -->
      <span v-for="pais in conflict.countries" :key="pais.id" class="pais-tag">
        {{ pais.name }}
      </span>
    </div>

    <div class="botons">
      <RouterLink :to="`/conflicts/${conflict.id}`">
        <button class="btn btn-veure">Veure detall</button>
      </RouterLink>
      <RouterLink :to="`/conflicts/${conflict.id}/edit`">
        <button class="btn btn-editar">Editar</button>
      </RouterLink>
      <!-- Emit cap al component pare -->
      <button class="btn btn-eliminar" @click="$emit('eliminar', conflict.id)">
        Eliminar
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props: rep les dades del conflicte des del component pare
const props = defineProps({
  conflict: {
    type: Object,
    required: true
  }
})

// Emits: notifica al pare quan es vol eliminar
defineEmits(['eliminar'])

// Computed: retorna la classe CSS segons l'estat
const classeEstat = computed(() => {
  if (props.conflict.status === 'ACTIVE') return 'badge-actiu'
  if (props.conflict.status === 'FROZEN') return 'badge-congelat'
  return 'badge-finalitzat'
})

// Computed: retorna el text llegible de l'estat
const etiquetaEstat = computed(() => {
  if (props.conflict.status === 'ACTIVE') return '🔴 Actiu'
  if (props.conflict.status === 'FROZEN') return '🔵 Congelat'
  return 'Finalitzat'
})
</script>

<style scoped>
.conflict-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-top h3 {
  margin: 0;
}

.badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: bold;
}

.badge-actiu {
  background-color: #ffe0e0;
  color: #c0392b;
}

.badge-congelat {
  background-color: #d6eaf8;
  color: #2471a3;
}

.badge-finalitzat {
  background-color: #e8e8e8;
  color: #555;
}

.data {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 6px;
}

.desc {
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: #333;
}

.paisos {
  margin-bottom: 10px;
  font-size: 0.85rem;
}

.pais-tag {
  background: #eee;
  border-radius: 4px;
  padding: 2px 8px;
  margin-left: 6px;
}

.botons {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-veure { background-color: #3498db; color: white; }
.btn-editar { background-color: #f39c12; color: white; }
.btn-eliminar { background-color: #e74c3c; color: white; }
</style>
