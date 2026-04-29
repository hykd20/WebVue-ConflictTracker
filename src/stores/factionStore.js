import { defineStore } from 'pinia'
import { getFactions, createFaction, deleteFaction } from '../services/api'

export const useFactionStore = defineStore('factions', {
  state: () => ({
    factions: [],
    loading: false,
    error: null
  }),

  actions: {
    async carregarFaccions() {
      this.loading = true
      this.error = null
      try {
        const res = await getFactions()
        this.factions = res.data
      } catch (e) {
        this.error = 'Error carregant les faccions'
      } finally {
        this.loading = false
      }
    },

    async crearFaccio(dades) {
      try {
        const res = await createFaction(dades)
        this.factions.push(res.data)
      } catch (e) {
        this.error = 'Error creant la facció'
      }
    },

    async eliminarFaccio(id) {
      try {
        await deleteFaction(id)
        this.factions = this.factions.filter(f => f.id !== id)
      } catch (e) {
        this.error = 'Error eliminant la facció'
      }
    }
  }
})
