<template>
  <div class="listado-view">
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Explorar Películas
      </h1>
      <p class="text-gray-300 text-lg">
        Descubre miles de películas de todos los géneros y épocas
      </p>
    </div>

    <div class="mb-8">
      <SearchBar 
        @search="handleSearch"
        @filter-genre="handleGenreFilter"
        @filter-rating="handleRatingFilter"
        @filter-year="handleYearFilter"
        @clear-filters="clearFilters"
      />
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div class="text-gray-300">
        <span v-if="!loading">
          Mostrando {{ movies.length }} de {{ totalResults }} películas
        </span>
      </div>

      <div class="flex items-center space-x-3">
        <label class="text-sm font-medium text-gray-300">Ordenar por:</label>
        <select
          v-model="sortBy"
          @change="handleSortChange"
          class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-cinema-red focus:border-cinema-red text-white"
        >
          <option value="popularity.desc">Popularidad (Mayor a menor)</option>
          <option value="popularity.asc">Popularidad (Menor a mayor)</option>
          <option value="release_date.desc">Más recientes</option>
          <option value="release_date.asc">Más antiguas</option>
          <option value="vote_average.desc">Mejor calificadas</option>
          <option value="vote_average.asc">Peor calificadas</option>
          <option value="title.asc">Título (A-Z)</option>
          <option value="title.desc">Título (Z-A)</option>
        </select>
      </div>
    </div>

    <LoadingSpinner 
      v-if="loading" 
      message="Explorando el catálogo de películas..."
    />

    <div v-else-if="error" class="text-center py-16">
      <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-white mb-2">Error al cargar películas</h3>
      <p class="text-gray-300 mb-6">{{ error }}</p>
      <button 
        @click="loadMovies"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>

    <div v-else-if="movies.length === 0" class="text-center py-16">
      <div class="w-16 h-16 bg-gray-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-white mb-2">No se encontraron películas</h3>
      <p class="text-gray-300 mb-6">Intenta ajustar los filtros de búsqueda</p>
      <button 
        @click="clearFilters"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Limpiar Filtros
      </button>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
        <MovieCard 
          v-for="movie in movies" 
          :key="movie.id" 
          :movie="movie"
          class="transform transition-all duration-300 hover:scale-105"
        />
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-sm text-gray-300">
          Página {{ currentPage }} de {{ totalPages }}
        </div>

        <div class="flex items-center space-x-2">
          <button
            @click="goToPage(1)"
            :disabled="currentPage === 1 || loading"
            class="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 disabled:text-gray-400 border border-gray-600 rounded-md transition-colors text-white"
          >
            ««
          </button>

          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1 || loading"
            class="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 disabled:text-gray-400 border border-gray-600 rounded-md transition-colors text-white"
          >
            « Anterior
          </button>

          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="goToPage(page)"
              :class="[
                'px-3 py-2 text-sm border rounded-md transition-colors',
                page === currentPage 
                  ? 'bg-cinema-red text-white border-cinema-red' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white border-gray-600'
              ]"
            >
              {{ page }}
            </button>
            <span v-else class="px-3 py-2 text-sm text-gray-400">...</span>
          </template>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages || loading"
            class="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 disabled:text-gray-400 border border-gray-600 rounded-md transition-colors text-white"
          >
            Siguiente »
          </button>

          <button
            @click="goToPage(totalPages)"
            :disabled="currentPage === totalPages || loading"
            class="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 disabled:text-gray-400 border border-gray-600 rounded-md transition-colors text-white"
          >
            »»
          </button>
        </div>

        <div class="sm:hidden w-full">
          <button
            v-if="currentPage < totalPages"
            @click="loadMoreMovies"
            :disabled="loadingMore"
            class="w-full px-6 py-3 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            <span v-if="!loadingMore">Cargar Más Películas</span>
            <span v-else>Cargando...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieService from '@/services/api'

// Reactive data
const movies = ref([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(0)
const totalResults = ref(0)
const sortBy = ref('popularity.desc')

// Filtros activos
const activeFilters = ref({
  query: '',
  genre: '',
  rating: '',
  year: ''
})

// Computed properties
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    // Mostrar todas las páginas si son 7 o menos
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Lógica para páginas con elipsis
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// Methods
const loadMovies = async (page = 1) => {
  loading.value = true
  error.value = null
  
  try {
    let response
    
    if (activeFilters.value.query) {
      response = await MovieService.searchMovies(activeFilters.value.query, page)
    } else if (activeFilters.value.genre) {
      response = await MovieService.discoverMoviesByGenre(activeFilters.value.genre, page)
    } else if (activeFilters.value.rating) {
      response = await MovieService.getMoviesByRating(activeFilters.value.rating, page)
    } else {
      response = await MovieService.getPopularMovies(page)
    }
    
    movies.value = response.results || []
    totalResults.value = response.total_results || 0
    totalPages.value = Math.min(response.total_pages || 0, 500) // API limita a 500 páginas
    currentPage.value = page
    
  } catch (err) {
    error.value = 'Error al cargar las películas. Verifica tu conexión a internet.'
    console.error('Error loading movies:', err)
  } finally {
    loading.value = false
  }
}

const loadMoreMovies = async () => {
  if (currentPage.value >= totalPages.value) return
  
  loadingMore.value = true
  const nextPage = currentPage.value + 1
  
  try {
    let response
    
    if (activeFilters.value.query) {
      response = await MovieService.searchMovies(activeFilters.value.query, nextPage)
    } else if (activeFilters.value.genre) {
      response = await MovieService.discoverMoviesByGenre(activeFilters.value.genre, nextPage)
    } else if (activeFilters.value.rating) {
      response = await MovieService.getMoviesByRating(activeFilters.value.rating, nextPage)
    } else {
      response = await MovieService.getPopularMovies(nextPage)
    }
    
    if (response && response.results) {
      movies.value = [...movies.value, ...response.results]
      currentPage.value = nextPage
    }
    
  } catch (err) {
    error.value = 'Error al cargar más películas.'
    console.error('Error loading more movies:', err)
  } finally {
    loadingMore.value = false
  }
}

const goToPage = (page) => {
  if (page !== currentPage.value && page >= 1 && page <= totalPages.value) {
    loadMovies(page)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleSearch = (searchParams) => {
  activeFilters.value = { ...searchParams }
  loadMovies(1)
}

const handleGenreFilter = (genreId) => {
  activeFilters.value.genre = genreId
  loadMovies(1)
}

const handleRatingFilter = (rating) => {
  activeFilters.value.rating = rating
  loadMovies(1)
}

const handleYearFilter = (year) => {
  activeFilters.value.year = year
  loadMovies(1)
}

const handleSortChange = () => {
  loadMovies(1)
}

const clearFilters = () => {
  activeFilters.value = {
    query: '',
    genre: '',
    rating: '',
    year: ''
  }
  loadMovies(1)
}

// Lifecycle
onMounted(() => {
  loadMovies()
})

// Watchers
watch(() => sortBy.value, () => {
  loadMovies(currentPage.value)
})
</script>

<style scoped>
.listado-view {
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

/* Mejoras responsive para grid */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

/* Estilos para paginación */
.pagination-button {
  transition: all 0.2s ease-in-out;
}

.pagination-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
