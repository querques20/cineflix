<template>
  <div class="flex flex-col items-center justify-center p-12">
    <!-- Spinner animado con efecto cinematográfico -->
    <div class="relative">
      <!-- Ring exterior -->
      <div class="w-20 h-20 border-4 border-cinema-red/20 rounded-full"></div>
      
      <!-- Ring animado -->
      <div 
        class="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-cinema-red border-r-cinema-accent rounded-full animate-spin"
        style="animation-duration: 1s;"
      ></div>
      
      <!-- Ring interior -->
      <div 
        class="absolute inset-2 w-16 h-16 border-2 border-transparent border-t-cinema-red-light rounded-full animate-spin"
        style="animation-duration: 2s; animation-direction: reverse;"
      ></div>
      
      <!-- Icono de película en el centro -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-8 h-8 bg-cinema-red rounded-lg flex items-center justify-center animate-pulse">
          <FilmIcon class="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
    
    <!-- Texto de carga -->
    <p class="mt-6 text-gray-300 text-lg font-medium animate-pulse">
      {{ message }}
    </p>
    
    <!-- Puntos animados con gradiente -->
    <div class="flex space-x-2 mt-4">
      <div 
        v-for="i in 3" 
        :key="i"
        class="w-3 h-3 rounded-full animate-bounce"
        :class="i === 1 ? 'bg-cinema-red' : i === 2 ? 'bg-cinema-accent' : 'bg-cinema-gold'"
        :style="{ animationDelay: `${i * 0.2}s` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { FilmIcon } from '@heroicons/vue/24/outline'

// Props
defineProps({
  message: {
    type: String,
    default: 'Cargando películas...'
  }
})
</script>

<style scoped>
/* Animaciones personalizadas */
@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>