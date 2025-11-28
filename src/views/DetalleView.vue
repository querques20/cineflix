<template>
  <div class="detalle-view">
    <LoadingSpinner 
      v-if="loading" 
      message="Cargando detalles de la película..."
    />

    <div v-else-if="error" class="text-center py-16">
      <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-white mb-2">Error al cargar película</h3>
      <p class="text-gray-300 mb-6">{{ error }}</p>
      <div class="space-x-4">
        <button 
          @click="loadMovieDetails"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Intentar de nuevo
        </button>
        <router-link 
          to="/"
          class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors inline-block"
        >
          Volver al inicio
        </router-link>
      </div>
    </div>

    <div v-else-if="movie.id" class="movie-details">
      <div class="relative mb-8 rounded-2xl overflow-hidden">
        <div 
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${backdropImage})` }"
        >
          <div class="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div class="relative z-10 p-8 md:p-12 text-white">
          <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div class="lg:col-span-1">
                <div class="relative max-w-sm mx-auto lg:mx-0">
                  <img 
                    :src="posterImage" 
                    :alt="movie.title"
                    class="w-full rounded-xl shadow-2xl"
                    @error="handleImageError"
                  />
                  
                  <button 
                    @click="toggleFavorite"
                    class="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full transition-all duration-200 shadow-lg"
                    :class="{ 'text-red-500': isFavorite, 'text-gray-400': !isFavorite }"
                  >
                    <HeartIcon 
                      class="w-6 h-6" 
                      :class="{ 'fill-current': isFavorite }"
                    />
                  </button>
                </div>
              </div>
              
              <div class="lg:col-span-2 space-y-6">
                <div>
                  <h1 class="text-4xl md:text-5xl font-bold mb-2">
                    {{ movie.title }}
                  </h1>
                  <p v-if="movie.original_title !== movie.title" class="text-xl text-gray-300 mb-4">
                    {{ movie.original_title }}
                  </p>
                  
                  <div class="flex flex-wrap items-center gap-4 text-lg">
                    <span class="flex items-center">
                      <CalendarIcon class="w-5 h-5 mr-2" />
                      {{ formattedReleaseDate }}
                    </span>
                    <span class="flex items-center">
                      <ClockIcon class="w-5 h-5 mr-2" />
                      {{ formattedRuntime }}
                    </span>
                    <span class="flex items-center">
                      <StarIcon class="w-5 h-5 mr-2 fill-current text-yellow-400" />
                      {{ formattedRating.value }}/10
                    </span>
                  </div>
                </div>

                <div v-if="movie.genres && movie.genres.length > 0">
                  <h3 class="text-lg font-semibold mb-3">Géneros</h3>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="genre in movie.genres" 
                      :key="genre.id"
                      class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium"
                    >
                      {{ genre.name }}
                    </span>
                  </div>
                </div>

                <div v-if="movie.overview">
                  <h3 class="text-lg font-semibold mb-3">Sinopsis</h3>
                  <p class="text-gray-200 text-lg leading-relaxed">
                    {{ movie.overview }}
                  </p>
                </div>

                <div class="flex flex-wrap gap-4 pt-4">
                  <button 
                    @click="toggleFavorite"
                    class="flex items-center px-6 py-3 font-medium rounded-lg transition-all duration-200"
                    :class="isFavorite 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'"
                  >
                    <HeartIcon 
                      class="w-5 h-5 mr-2" 
                      :class="{ 'fill-current': isFavorite }"
                    />
                    {{ isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
                  </button>
                  
                  <router-link 
                    to="/listado"
                    class="flex items-center px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium rounded-lg transition-all duration-200"
                  >
                    <ArrowLeftIcon class="w-5 h-5 mr-2" />
                    Volver al catálogo
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div class="lg:col-span-2 space-y-8">
          <section v-if="movie.credits && movie.credits.cast && movie.credits.cast.length > 0">
            <h2 class="text-2xl font-bold text-white mb-6">Reparto Principal</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div 
                v-for="actor in movie.credits.cast.slice(0, 8)" 
                :key="actor.id"
                class="text-center"
              >
                <div class="relative mb-3">
                  <img 
                    :src="actor.profile_path 
                      ? MovieService.getImageUrl(actor.profile_path)
                      : 'https://via.placeholder.com/200x300/374151/ffffff?text=Sin+Foto'"
                    :alt="actor.name"
                    class="w-full aspect-[3/4] object-cover rounded-lg shadow-sm"
                    @error="handleActorImageError"
                  />
                </div>
                <h4 class="font-semibold text-white text-sm">{{ actor.name }}</h4>
                <p class="text-gray-300 text-xs">{{ actor.character }}</p>
              </div>
            </div>
          </section>

          <section v-if="movie.videos && movie.videos.results && movie.videos.results.length > 0">
            <h2 class="text-2xl font-bold text-white mb-6">Videos</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="video in movie.videos.results.slice(0, 4)" 
                :key="video.id"
                class="relative"
              >
                <div class="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    :src="`https://www.youtube.com/embed/${video.key}`"
                    :title="video.name"
                    class="w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <p class="mt-2 text-sm font-medium text-white">{{ video.name }}</p>
                <p class="text-xs text-gray-300">{{ video.type }}</p>
              </div>
            </div>
          </section>
        </div>

        <div class="space-y-6">
          <div class="glass-card p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-white mb-4">Información</h3>
            <div class="space-y-3 text-sm">
              <div v-if="movie.budget && movie.budget > 0">
                <span class="font-medium text-gray-200">Presupuesto:</span>
                <span class="text-gray-300 ml-2">${{ formatCurrency(movie.budget) }}</span>
              </div>
              <div v-if="movie.revenue && movie.revenue > 0">
                <span class="font-medium text-gray-200">Recaudación:</span>
                <span class="text-gray-300 ml-2">${{ formatCurrency(movie.revenue) }}</span>
              </div>
              <div v-if="movie.vote_count">
                <span class="font-medium text-gray-200">Votos:</span>
                <span class="text-gray-300 ml-2">{{ movie.vote_count.toLocaleString() }}</span>
              </div>
              <div v-if="movie.production_countries && movie.production_countries.length > 0">
                <span class="font-medium text-gray-200">País:</span>
                <span class="text-gray-300 ml-2">
                  {{ movie.production_countries.map(c => c.name).join(', ') }}
                </span>
              </div>
              <div v-if="movie.spoken_languages && movie.spoken_languages.length > 0">
                <span class="font-medium text-gray-200">Idiomas:</span>
                <span class="text-gray-300 ml-2">
                  {{ movie.spoken_languages.map(l => l.name).join(', ') }}
                </span>
              </div>
            </div>
          </div>

          <div 
            v-if="movie.production_companies && movie.production_companies.length > 0"
            class="glass-card p-6 rounded-xl"
          >
            <h3 class="text-lg font-semibold text-white mb-4">Productoras</h3>
            <div class="space-y-3">
              <div 
                v-for="company in movie.production_companies.slice(0, 5)" 
                :key="company.id"
                class="flex items-center space-x-3"
              >
                <div v-if="company.logo_path" class="flex-shrink-0">
                  <img 
                    :src="MovieService.getImageUrl(company.logo_path)"
                    :alt="company.name"
                    class="h-8 w-auto object-contain"
                  />
                </div>
                <span class="text-sm text-gray-200">{{ company.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section 
        v-if="movie.similar && movie.similar.results && movie.similar.results.length > 0"
        class="max-w-6xl mx-auto"
      >
        <h2 class="text-2xl font-bold text-white mb-6">Películas Similares</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <MovieCard 
            v-for="similarMovie in movie.similar.results.slice(0, 10)" 
            :key="similarMovie.id" 
            :movie="similarMovie"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  HeartIcon, 
  CalendarIcon, 
  ClockIcon, 
  StarIcon,
  ArrowLeftIcon 
} from '@heroicons/vue/24/outline'
import MovieCard from '@/components/MovieCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieService from '@/services/api'
import { useFavorites } from '@/composables/useFavorites'

// Router
const route = useRoute()
const router = useRouter()

// Composables
const { toggleFavorite: toggleFav, isFavorite: checkIsFavorite } = useFavorites()

// Reactive data
const movie = ref({})
const loading = ref(false)
const error = ref(null)

// Computed properties
const posterImage = computed(() => {
  return movie.value.poster_path 
    ? MovieService.getImageUrl(movie.value.poster_path)
    : 'https://via.placeholder.com/500x750/374151/ffffff?text=Sin+Poster'
})

const backdropImage = computed(() => {
  return movie.value.backdrop_path 
    ? MovieService.getBackdropUrl(movie.value.backdrop_path)
    : 'https://via.placeholder.com/1920x1080/1f2937/ffffff?text=Sin+Imagen'
})

const formattedReleaseDate = computed(() => {
  return MovieService.formatDate(movie.value.release_date)
})

const formattedRuntime = computed(() => {
  return MovieService.formatRuntime(movie.value.runtime)
})

const formattedRating = computed(() => {
  return MovieService.formatRating(movie.value.vote_average || 0)
})

const isFavorite = computed(() => {
  return checkIsFavorite(movie.value.id)
})

// Methods
const loadMovieDetails = async () => {
  const movieId = route.params.id
  
  if (!movieId) {
    error.value = 'ID de película no válido'
    return
  }

  loading.value = true
  error.value = null
  
  try {
    const movieData = await MovieService.getMovieDetails(movieId)
    movie.value = movieData
  } catch (err) {
    error.value = 'No se pudo cargar la información de la película. Verifica tu conexión a internet.'
    console.error('Error loading movie details:', err)
  } finally {
    loading.value = false
  }
}

const toggleFavorite = () => {
  if (movie.value.id) {
    toggleFav(movie.value)
  }
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/500x750/374151/ffffff?text=Sin+Poster'
}

const handleActorImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/200x300/374151/ffffff?text=Sin+Foto'
}

const formatCurrency = (amount) => {
  return (amount / 1000000).toFixed(1) + 'M'
}

// Lifecycle
onMounted(() => {
  loadMovieDetails()
})
</script>

<style scoped>
.detalle-view {
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

/* Efectos hover para botones */
.hover\:bg-opacity-30:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* Mejoras responsive */
@media (max-width: 768px) {
  .movie-details .grid {
    grid-template-columns: 1fr;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .text-5xl {
    font-size: 2.5rem;
  }
}

/* Estilo para videos responsivos */
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Mejoras de accesibilidad */
iframe:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
