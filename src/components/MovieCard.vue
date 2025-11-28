<template>
  <div class="glass-card rounded-xl overflow-hidden hover:border-cinema-red/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cinema-glow">
    <div class="relative aspect-[2/3] overflow-hidden">
      <img 
        :src="movieImage" 
        :alt="movie.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="handleImageError"
        loading="lazy"
      />
      
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div class="absolute top-3 right-3 glass-effect px-3 py-1 rounded-full text-sm font-bold text-cinema-gold">
        <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        {{ formattedRating }}
      </div>
      
      <button 
        @click.prevent="toggleFavorite"
        class="absolute top-3 left-3 glass-effect p-2 rounded-full transition-all duration-300 hover:scale-110"
        :class="{ 
          'text-cinema-red bg-cinema-red/20': isFavorite, 
          'text-gray-400 hover:text-cinema-red': !isFavorite 
        }"
      >
        <HeartIcon 
          class="w-5 h-5" 
          :class="{ 'fill-current': isFavorite }"
        />
      </button>
      
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="bg-cinema-red/80 backdrop-blur-sm rounded-full p-4 hover:bg-cinema-red transition-colors duration-200 cursor-pointer">
          <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 5v10l8-5-8-5z"/>
          </svg>
        </div>
      </div>
    </div>
    
    <div class="p-5">
      <h3 class="font-bold text-lg text-white mb-2 line-clamp-2 hover:text-cinema-red-light transition-colors duration-200">
        {{ movie.title }}
      </h3>
      
      <p class="text-gray-400 text-sm mb-3 font-medium">
        {{ formattedDate }}
      </p>
      
      <p class="text-gray-300 text-sm line-clamp-3 mb-5 leading-relaxed">
        {{ movie.overview || 'Sin descripción disponible' }}
      </p>
      
      <router-link 
        :to="`/detalle/${movie.id}`"
        class="inline-block w-full bg-gradient-to-r from-cinema-red to-cinema-red-dark hover:from-cinema-red-dark hover:to-cinema-red text-white text-center py-3 px-4 rounded-lg transition-all duration-300 font-semibold cinema-glow transform hover:scale-105"
      >
        Ver Detalles
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { HeartIcon } from '@heroicons/vue/24/outline'
import MovieService from '@/services/api'
import { useFavorites } from '@/composables/useFavorites'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const { toggleFavorite: toggleFav, isFavorite: checkIsFavorite } = useFavorites()

const movieImage = computed(() => {
  return props.movie.poster_path 
    ? MovieService.getImageUrl(props.movie.poster_path)
    : 'https://via.placeholder.com/300x450/374151/ffffff?text=Sin+Imagen'
})

const formattedRating = computed(() => {
  return (props.movie.vote_average || 0).toFixed(1)
})

const formattedDate = computed(() => {
  return MovieService.formatDate(props.movie.release_date)
})

const isFavorite = computed(() => {
  return checkIsFavorite(props.movie.id)
})

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300x450/374151/ffffff?text=Sin+Imagen'
}

const toggleFavorite = () => {
  toggleFav(props.movie)
}
</script>

<style scoped>
/* Clase utilitaria para limitar líneas de texto */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Efecto hover suave */
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>