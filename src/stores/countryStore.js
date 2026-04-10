import { defineStore } from 'pinia'
import { getCountries, createCountry, deleteCountry } from '../services/api'

export const useCountryStore = defineStore('countries', {
  state: () => ({
    countries: [],
    loading: false,
    error: null
  }),

  actions: {
    async carregarPaisos() {
      this.loading = true
      this.error = null
      try {
        const res = await getCountries()
        this.countries = res.data
      } catch (e) {
        this.error = 'Error carregant els països'
      } finally {
        this.loading = false
      }
    },

    async crearPais(dades) {
      try {
        const res = await createCountry(dades)
        this.countries.push(res.data)
      } catch (e) {
        this.error = 'Error creant el país'
      }
    },

    async eliminarPais(id) {
      try {
        await deleteCountry(id)
        this.countries = this.countries.filter(p => p.id !== id)
      } catch (e) {
        this.error = 'Error eliminant el país'
      }
    }
  }
})
