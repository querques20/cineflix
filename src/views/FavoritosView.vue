<template>
  <div class="favoritos-view">
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Mis Películas Favoritas
      </h1>
      <p class="text-gray-300 text-lg">
        Aquí puedes ver todas las películas que has agregado a favoritos
      </p>
    </div>

    <div class="glass-card p-6 mb-8 rounded-xl">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex items-center space-x-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-cinema-red">{{ favoritesCount }}</div>
            <div class="text-sm text-gray-400">Favoritas</div>
          </div>
          <div class="text-center" v-if="favoritesCount > 0">
            <div class="text-2xl font-bold text-green-400">{{ averageRating }}</div>
            <div class="text-sm text-gray-300">Promedio</div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative flex-1 min-w-64">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar en favoritos..."
              class="w-full px-4 py-2 pl-10 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-cinema-red focus:border-cinema-red placeholder-gray-500"
            />
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <button
            v-if="favoritesCount > 0"
            @click="showClearConfirmation = true"
            class="px-4 py-2 bg-red-900/40 hover:bg-red-700/60 text-red-200 font-medium rounded-lg transition-colors flex items-center border border-red-500/60"
          >
            <TrashIcon class="w-4 h-4 mr-2" />
            Limpiar Todo
          </button>
        </div>
      </div>
    </div>

    <div v-if="favoritesCount === 0" class="text-center py-16">
      <h3 class="text-2xl font-semibold text-white mb-4">
        No tienes películas favoritas aún
      </h3>
      <p class="text-gray-300 mb-8 max-w-md mx-auto">
        Explora nuestro catálogo y agrega películas a tus favoritos para verlas aquí más tarde
      </p>
      <div class="space-y-4">
        <router-link 
          to="/"
          class="inline-block px-8 py-3 bg-cinema-red hover:bg-cinema-red-dark text-white font-medium rounded-lg transition-colors cinema-glow"
        >
          Explorar Películas Populares
        </router-link>
        <br>
        <router-link 
          to="/listado"
          class="inline-block text-cinema-red hover:text-cinema-red-light font-medium"
        >
          Ver Catálogo Completo →
        </router-link>
      </div>
    </div>

    <div v-else>
      <div v-if="searchQuery" class="mb-6">
        <p class="text-gray-300">
          Mostrando {{ filteredFavorites.length }} de {{ favoritesCount }} favoritas
          <button 
            @click="searchQuery = ''"
            class="ml-2 text-cinema-red hover:text-cinema-red-light text-sm"
          >
            (limpiar búsqueda)
          </button>
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div 
          v-for="movie in filteredFavorites" 
          :key="movie.id"
          class="relative group"
        >
          <MovieCard :movie="movie" />
          
          <!-- Fecha agregada -->
          <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded text-center">
              Agregada: {{ formatDate(movie.addedAt) }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="searchQuery && filteredFavorites.length === 0" class="text-center py-12">
        <h3 class="text-xl font-semibold text-white mb-2">
          No se encontraron favoritas
        </h3>
        <p class="text-gray-300 mb-6">
          No hay películas favoritas que coincidan con "{{ searchQuery }}"
        </p>
        <button 
          @click="searchQuery = ''"
          class="px-6 py-3 bg-cinema-red hover:bg-cinema-red-dark text-white font-medium rounded-lg transition-colors cinema-glow"
        >
          Ver Todas las Favoritas
        </button>
      </div>
    </div>

    <div v-if="showClearConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="glass-card p-6 max-w-md w-full rounded-xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-4">
            ¿Estás seguro?
          </h3>
          <p class="text-gray-300 mb-6">
            Esta acción eliminará todas tus películas favoritas ({{ favoritesCount }} películas). Esta acción no se puede deshacer.
          </p>
          <div class="flex space-x-3">
            <button
              @click="showClearConfirmation = false"
              class="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="confirmClearFavorites"
              class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Sí, Eliminar Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/vue/24/outline'
import MovieCard from '@/components/MovieCard.vue'
import { useFavorites } from '@/composables/useFavorites'

// Composables
const { favorites, favoritesCount, clearFavorites, searchFavorites } = useFavorites()

// Reactive data
const searchQuery = ref('')
const showClearConfirmation = ref(false)

// Computed properties
const filteredFavorites = computed(() => {
  if (!searchQuery.value) return favorites.value
  return searchFavorites(searchQuery.value)
})

const averageRating = computed(() => {
  if (favorites.value.length === 0) return '0.0'
  
  const sum = favorites.value.reduce((acc, movie) => acc + (movie.vote_average || 0), 0)
  const average = sum / favorites.value.length
  return average.toFixed(1)
})

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const confirmClearFavorites = () => {
  clearFavorites()
  showClearConfirmation.value = false
  searchQuery.value = ''
}
</script>

<style scoped>
.favoritos-view {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mejoras para el hover de las tarjetas */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Responsive mejoras */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>