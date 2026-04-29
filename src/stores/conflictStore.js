import { defineStore } from 'pinia'
import { getConflicts, getConflictsByStatus, deleteConflict } from '../services/api'

export const useConflictStore = defineStore('conflicts', {
  state: () => ({
    conflicts: [],
    loading: false,
    error: null,
    filtreEstat: 'TOTS',
    cercador: ''
  }),

  getters: {
    // Computed: filtra per estat i per text del cercador
    conflictsFiltrats(state) {
      let llista = state.conflicts

      if (state.filtreEstat !== 'TOTS') {
        llista = llista.filter(c => c.status === state.filtreEstat)
      }

      if (state.cercador.trim() !== '') {
        const text = state.cercador.toLowerCase()
        llista = llista.filter(c => c.name.toLowerCase().includes(text))
      }

      return llista
    },

    totalActius: (state) => state.conflicts.filter(c => c.status === 'ACTIVE').length,
    totalFinalitzats: (state) => state.conflicts.filter(c => c.status === 'ENDED').length,
    totalCongelats: (state) => state.conflicts.filter(c => c.status === 'FROZEN').length
  },

  actions: {
    async carregarConflictes() {
      this.loading = true
      this.error = null
      try {
        const res = await getConflicts()
        this.conflicts = res.data
      } catch (e) {
        this.error = 'Error carregant els conflictes'
      } finally {
        this.loading = false
      }
    },

    async eliminarConflicte(id) {
      try {
        await deleteConflict(id)
        this.conflicts = this.conflicts.filter(c => c.id !== id)
      } catch (e) {
        this.error = 'Error eliminant el conflicte'
      }
    }
  }
})
