<template>
  <div class="home-view">
    <section class="relative overflow-hidden rounded-2xl mb-12">
      <div class="absolute inset-0 bg-cinema-glass"></div>
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,<svg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><g fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;><g fill=&quot;%23dc2626&quot; fill-opacity=&quot;0.1&quot;><circle cx=&quot;9&quot; cy=&quot;9&quot; r=&quot;2&quot;/><circle cx=&quot;49&quot; cy=&quot;49&quot; r=&quot;2&quot;/><circle cx=&quot;9&quot; cy=&quot;49&quot; r=&quot;2&quot;/><circle cx=&quot;49&quot; cy=&quot;9&quot; r=&quot;2&quot;/></g></g></svg>');"></div>
      </div>
      
      <div class="relative z-10 container mx-auto text-center py-20">
        <div class="mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-cinema-red rounded-2xl mb-6 cinema-glow animate-float">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
            </svg>
          </div>
        </div>
        
        <h1 class="text-4xl md:text-7xl font-bold mb-6 leading-tight">
          <span class="text-cinema-gradient">Descubre el</span>
          <br>
          <span class="text-white">Mejor Cine</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Explora miles de películas, encuentra tus favoritas y descubre nuevos títulos que cambiarán tu perspectiva del cine
        </p>
        
        <div class="max-w-2xl mx-auto">
          <SearchBar 
            @search="handleSearch"
            @clear-filters="loadPopularMovies"
          />
        </div>
      </div>
    </section>

    <section class="stats-section mb-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="glass-card p-6 text-center rounded-xl">
          <div class="w-12 h-12 bg-cinema-red/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-cinema-red" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="text-2xl font-bold text-white mb-1">Miles</div>
          <div class="text-sm text-gray-400">de Películas</div>
        </div>
        
        <div class="glass-card p-6 text-center rounded-xl">
          <div class="w-12 h-12 bg-cinema-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-cinema-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div class="text-2xl font-bold text-white mb-1">Top</div>
          <div class="text-sm text-gray-400">Calificadas</div>
        </div>
        
        <div class="glass-card p-6 text-center rounded-xl">
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="text-2xl font-bold text-white mb-1">Favoritos</div>
          <div class="text-sm text-gray-400">Personales</div>
        </div>
        
        <div class="glass-card p-6 text-center rounded-xl">
          <div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <div class="text-2xl font-bold text-white mb-1">Géneros</div>
          <div class="text-sm text-gray-400">Disponibles</div>
        </div>
      </div>
    </section>

    <section v-if="!isSearching && trendingMovies.length > 0" class="trending-section mb-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-white mb-2">Tendencias de la Semana</h2>
          <p class="text-gray-400">Las películas más populares en este momento</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MovieCard 
          v-for="movie in trendingMovies.slice(0, 6)" 
          :key="`trending-${movie.id}`" 
          :movie="movie"
          class="transform transition-all duration-300 hover:scale-105"
        />
      </div>
    </section>

    <section class="popular-movies">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-white mb-2">
            {{ searchResults.length > 0 ? 'Resultados de Búsqueda' : 'Películas Populares' }}
          </h2>
          <p class="text-gray-400">
            {{ searchResults.length > 0 
              ? `${totalResults} resultados encontrados` 
              : 'Descubre los títulos más aclamados del cine actual' 
            }}
          </p>
        </div>
        
        <!-- Botón ver más -->
        <router-link 
          v-if="!isSearching"
          to="/listado"
          class="hidden md:inline-flex items-center px-6 py-3 bg-gradient-to-r from-cinema-red to-cinema-red-dark hover:from-cinema-red-dark hover:to-cinema-red text-white font-medium rounded-lg transition-all duration-300 cinema-glow"
        >
          Ver Catálogo
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </router-link>
      </div>

      <!-- Loading state -->
      <LoadingSpinner 
        v-if="loading" 
        :message="isSearching ? 'Buscando películas...' : 'Cargando películas populares...'"
      />

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-16">
        <div class="glass-card p-8 rounded-2xl max-w-md mx-auto">
          <div class="w-16 h-16 bg-cinema-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-cinema-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Error al cargar películas</h3>
          <p class="text-gray-400 mb-6">{{ error }}</p>
          <button 
            @click="retryLoadMovies"
            class="px-6 py-3 bg-gradient-to-r from-cinema-red to-cinema-red-dark hover:from-cinema-red-dark hover:to-cinema-red text-white font-medium rounded-lg transition-all duration-300 cinema-glow"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>

      <!-- No results state -->
      <div v-else-if="displayMovies.length === 0 && !loading" class="text-center py-12">
        <div class="glass-card p-8 rounded-2xl max-w-md mx-auto">
          <div class="w-16 h-16 bg-cinema-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-cinema-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">No se encontraron resultados</h3>
          <p class="text-gray-400 mb-6">
            {{ isSearching 
              ? 'Intenta con otros términos de búsqueda' 
              : 'No hay películas disponibles en este momento' 
            }}
          </p>
          <button 
            @click="clearSearchAndLoadPopular"
            class="px-6 py-3 bg-gradient-to-r from-cinema-accent to-cinema-red hover:from-cinema-red hover:to-cinema-accent text-white font-medium rounded-lg transition-all duration-300 cinema-glow"
          >
            Ver Películas Populares
          </button>
        </div>
      </div>

      <!-- Movies Grid -->
      <div 
        v-else 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <MovieCard 
          v-for="movie in displayMovies" 
          :key="movie.id" 
          :movie="movie"
          class="transform transition-all duration-300 hover:scale-105"
        />
      </div>

      <!-- Load More button para búsquedas -->
      <div v-if="canLoadMore" class="text-center mt-12">
        <button 
          @click="loadMoreMovies"
          :disabled="loadingMore"
          class="px-8 py-4 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors inline-flex items-center"
        >
          <span v-if="!loadingMore">Cargar Más Películas</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando...
          </span>
        </button>
      </div>

      <!-- Mobile "Ver todas" button -->
      <div v-if="!isSearching" class="text-center mt-12 md:hidden">
        <router-link 
          to="/listado"
          class="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Ver Todas las Películas
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieService from '@/services/api'

// Reactive data
const movies = ref([])
const trendingMovies = ref([])
const searchResults = ref([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref(null)
const isSearching = ref(false)
const currentPage = ref(1)
const totalResults = ref(0)
const totalPages = ref(0)
const lastSearchParams = ref(null)

// Computed properties
const displayMovies = computed(() => {
  return isSearching.value ? searchResults.value : movies.value
})

const canLoadMore = computed(() => {
  return isSearching.value && currentPage.value < totalPages.value && !loading.value
})

// Methods
const loadPopularMovies = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Cargar películas populares y tendencias en paralelo
    const [popularResponse, trendingResponse] = await Promise.all([
      MovieService.getPopularMovies(1),
      MovieService.getTrendingMovies()
    ])
    
    movies.value = popularResponse.results || []
    trendingMovies.value = trendingResponse.results || []
    isSearching.value = false
  } catch (err) {
    error.value = 'Error al cargar las películas populares. Por favor, verifica tu conexión a internet.'
    console.error('Error loading popular movies:', err)
  } finally {
    loading.value = false
  }
}

const handleSearch = async (searchParams) => {
  if (!searchParams.query && !searchParams.genre && !searchParams.rating && !searchParams.year) {
    loadPopularMovies()
    return
  }

  loading.value = true
  error.value = null
  isSearching.value = true
  currentPage.value = 1
  lastSearchParams.value = searchParams

  try {
    let response
    
    if (searchParams.query) {
      // Búsqueda por título
      response = await MovieService.searchMovies(searchParams.query, 1)
    } else if (searchParams.genre) {
      // Búsqueda por género
      response = await MovieService.discoverMoviesByGenre(searchParams.genre, 1)
    } else if (searchParams.rating) {
      // Búsqueda por clasificación
      response = await MovieService.getMoviesByRating(searchParams.rating, 1)
    }
    
    searchResults.value = response.results || []
    totalResults.value = response.total_results || 0
    totalPages.value = response.total_pages || 0
    
  } catch (err) {
    error.value = 'Error al buscar películas. Por favor, intenta de nuevo.'
    console.error('Error searching movies:', err)
    searchResults.value = []
  } finally {
    loading.value = false
  }
}

const loadMoreMovies = async () => {
  if (!canLoadMore.value || !lastSearchParams.value) return
  
  loadingMore.value = true
  const nextPage = currentPage.value + 1
  
  try {
    let response
    
    if (lastSearchParams.value.query) {
      response = await MovieService.searchMovies(lastSearchParams.value.query, nextPage)
    } else if (lastSearchParams.value.genre) {
      response = await MovieService.discoverMoviesByGenre(lastSearchParams.value.genre, nextPage)
    } else if (lastSearchParams.value.rating) {
      response = await MovieService.getMoviesByRating(lastSearchParams.value.rating, nextPage)
    }
    
    if (response && response.results) {
      searchResults.value = [...searchResults.value, ...response.results]
      currentPage.value = nextPage
    }
    
  } catch (err) {
    error.value = 'Error al cargar más películas.'
    console.error('Error loading more movies:', err)
  } finally {
    loadingMore.value = false
  }
}

const retryLoadMovies = () => {
  if (isSearching.value && lastSearchParams.value) {
    handleSearch(lastSearchParams.value)
  } else {
    loadPopularMovies()
  }
}

const clearSearchAndLoadPopular = () => {
  isSearching.value = false
  searchResults.value = []
  lastSearchParams.value = null
  loadPopularMovies()
}

// Lifecycle
onMounted(() => {
  loadPopularMovies()
})
</script>

<style scoped>
.hero-section {
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
}

.home-view {
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

/* Mejoras para grid responsive */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
