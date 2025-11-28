<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="relative mb-6">
      <div class="relative">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          @keyup.enter="performSearch"
          type="text"
          placeholder="Buscar películas por título..."
          class="w-full px-4 py-4 pl-12 pr-20 text-white bg-cinema-gray/50 backdrop-blur-md border border-cinema-red/30 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-cinema-red focus:border-cinema-red transition-all duration-300 placeholder-gray-400"
        />
        
        <MagnifyingGlassIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cinema-red" />
        
        <button 
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cinema-red transition-colors duration-200"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
        
        <button
          @click="performSearch"
          :disabled="!searchQuery.trim()"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cinema-red to-cinema-red-dark hover:from-cinema-red-dark hover:to-cinema-red disabled:from-gray-600 disabled:to-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium"
        >
          Buscar
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-4 mb-6">
      <div class="flex-1 min-w-48">
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Género
        </label>
        <select
          v-model="selectedGenre"
          @change="handleGenreChange"
          class="w-full px-3 py-3 bg-cinema-gray/50 backdrop-blur-md border border-cinema-red/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cinema-red focus:border-cinema-red transition-all duration-300"
        >
          <option value="">Todos los géneros</option>
          <option 
            v-for="genre in genres" 
            :key="genre.id" 
            :value="genre.id"
          >
            {{ genre.name }}
          </option>
        </select>
      </div>

      <div class="flex-1 min-w-48">
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Clasificación
        </label>
        <select
          v-model="selectedRating"
          @change="handleRatingChange"
          class="w-full px-3 py-3 bg-cinema-gray/50 backdrop-blur-md border border-cinema-red/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cinema-red focus:border-cinema-red transition-all duration-300"
        >
          <option value="">Todas las clasificaciones</option>
          <option value="G">G - Público general</option>
          <option value="PG">PG - Se sugiere supervisión</option>
          <option value="PG-13">PG-13 - Mayores de 13 años</option>
          <option value="R">R - Restringida</option>
          <option value="NC-17">NC-17 - Solo adultos</option>
        </select>
      </div>

      <div class="flex-1 min-w-32">
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Año
        </label>
        <select
          v-model="selectedYear"
          @change="handleYearChange"
          class="w-full px-3 py-3 bg-cinema-gray/50 backdrop-blur-md border border-cinema-red/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cinema-red focus:border-cinema-red transition-all duration-300"
        >
          <option value="">Todos los años</option>
          <option 
            v-for="year in years" 
            :key="year" 
            :value="year"
          >
            {{ year }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-4">
      <span class="text-sm text-gray-600">Filtros activos:</span>
      
      <span 
        v-if="searchQuery" 
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
      >
        Búsqueda: "{{ searchQuery }}"
        <button 
          @click="clearSearch" 
          class="ml-2 hover:text-blue-600"
        >
          <XMarkIcon class="w-3 h-3" />
        </button>
      </span>
      
      <span 
        v-if="selectedGenre && currentGenreName" 
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
      >
        Género: {{ currentGenreName }}
        <button 
          @click="clearGenre" 
          class="ml-2 hover:text-green-600"
        >
          <XMarkIcon class="w-3 h-3" />
        </button>
      </span>
      
      <span 
        v-if="selectedRating" 
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
      >
        Clasificación: {{ selectedRating }}
        <button 
          @click="clearRating" 
          class="ml-2 hover:text-purple-600"
        >
          <XMarkIcon class="w-3 h-3" />
        </button>
      </span>
      
      <span 
        v-if="selectedYear" 
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
      >
        Año: {{ selectedYear }}
        <button 
          @click="clearYear" 
          class="ml-2 hover:text-orange-600"
        >
          <XMarkIcon class="w-3 h-3" />
        </button>
      </span>

      <button 
        @click="clearAllFilters"
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-white hover:bg-gray-600"
      >
        Limpiar todo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import MovieService from '@/services/api'

// Emits
const emit = defineEmits(['search', 'filter-genre', 'filter-rating', 'filter-year', 'clear-filters'])

// Reactive data
const searchQuery = ref('')
const selectedGenre = ref('')
const selectedRating = ref('')
const selectedYear = ref('')
const genres = ref([])

// Computed properties
const currentGenreName = computed(() => {
  const genre = genres.value.find(g => g.id == selectedGenre.value)
  return genre ? genre.name : ''
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedGenre.value || selectedRating.value || selectedYear.value
})

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const startYear = 1950
  const yearsList = []
  
  for (let year = currentYear; year >= startYear; year--) {
    yearsList.push(year)
  }
  
  return yearsList
})

// Methods
const handleSearch = () => {
  // Búsqueda en tiempo real con debounce
  clearTimeout(handleSearch.timeout)
  handleSearch.timeout = setTimeout(() => {
    if (searchQuery.value.length >= 3 || searchQuery.value === '') {
      performSearch()
    }
  }, 300)
}

const performSearch = () => {
  emit('search', {
    query: searchQuery.value.trim(),
    genre: selectedGenre.value,
    rating: selectedRating.value,
    year: selectedYear.value
  })
}

const handleGenreChange = () => {
  emit('filter-genre', selectedGenre.value)
  performSearch()
}

const handleRatingChange = () => {
  emit('filter-rating', selectedRating.value)
  performSearch()
}

const handleYearChange = () => {
  emit('filter-year', selectedYear.value)
  performSearch()
}

const clearSearch = () => {
  searchQuery.value = ''
  performSearch()
}

const clearGenre = () => {
  selectedGenre.value = ''
  handleGenreChange()
}

const clearRating = () => {
  selectedRating.value = ''
  handleRatingChange()
}

const clearYear = () => {
  selectedYear.value = ''
  handleYearChange()
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedGenre.value = ''
  selectedRating.value = ''
  selectedYear.value = ''
  emit('clear-filters')
  performSearch()
}

// Cargar géneros al montar el componente
onMounted(async () => {
  try {
    genres.value = await MovieService.getGenres()
  } catch (error) {
    console.error('Error loading genres:', error)
  }
})
</script>