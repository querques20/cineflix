<template>
  <nav class="glass-card sticky top-0 z-50 border-b border-cinema-red/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link 
            to="/" 
            class="flex items-center space-x-3 text-white hover:text-cinema-red-light transition-all duration-300 group"
          >
            <div class="relative">
              <div class="w-8 h-8 bg-cinema-red rounded-lg flex items-center justify-center cinema-glow group-hover:animate-glow">
                <FilmIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <span class="text-xl font-bold hidden sm:block text-cinema-gradient">CineFlix</span>
            <span class="text-xl font-bold sm:hidden text-cinema-gradient">CF</span>
          </router-link>
        </div>
        
        <div class="hidden md:flex items-center space-x-2">
          <router-link
            to="/"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/' }"
          >
            <HomeIcon class="w-4 h-4 mr-2" />
            Inicio
          </router-link>
          
          <router-link
            to="/listado"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/listado' }"
          >
            <RectangleStackIcon class="w-4 h-4 mr-2" />
            Catálogo
          </router-link>
          
          <router-link
            to="/favoritos"
            class="nav-link relative"
            :class="{ 'nav-link-active': $route.path === '/favoritos' }"
          >
            <HeartIcon class="w-4 h-4 mr-2" />
            Favoritos
            <span 
              v-if="favoritesCount > 0" 
              class="absolute -top-1 -right-1 bg-gradient-to-r from-cinema-red to-cinema-red-dark text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
            >
              {{ favoritesCount > 9 ? '9+' : favoritesCount }}
            </span>
          </router-link>
        </div>

        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-white hover:text-cinema-red-light focus:outline-none transition-all duration-300 p-2 rounded-lg glass-effect"
          >
            <Bars3Icon v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <div 
      v-if="isMobileMenuOpen" 
      class="md:hidden glass-card border-t border-cinema-red/30"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          @click="closeMobileMenu"
          class="mobile-nav-link"
          :class="{ 'mobile-nav-link-active': $route.path === '/' }"
        >
          <HomeIcon class="w-5 h-5 mr-3" />
          Inicio
        </router-link>
        
        <router-link
          to="/listado"
          @click="closeMobileMenu"
          class="mobile-nav-link"
          :class="{ 'mobile-nav-link-active': $route.path === '/listado' }"
        >
          <RectangleStackIcon class="w-5 h-5 mr-3" />
          Explorar
        </router-link>
        
        <router-link
          to="/favoritos"
          @click="closeMobileMenu"
          class="mobile-nav-link flex items-center justify-between"
          :class="{ 'mobile-nav-link-active': $route.path === '/favoritos' }"
        >
          <div class="flex items-center">
            <HeartIcon class="w-5 h-5 mr-3" />
            Favoritos
          </div>
          <span 
            v-if="favoritesCount > 0" 
            class="bg-gradient-to-r from-cinema-red to-cinema-red-dark text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
          >
            {{ favoritesCount > 99 ? '99+' : favoritesCount }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  FilmIcon, 
  HomeIcon, 
  HeartIcon, 
  RectangleStackIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/vue/24/outline'
import { useFavorites } from '@/composables/useFavorites'

// Composables
const { favoritesCount } = useFavorites()

// Reactive data
const isMobileMenuOpen = ref(false)

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
/* Estilos para navegación desktop sin borde ni remarcado */
.nav-link {
  @apply flex items-center px-4 py-2 text-gray-200 font-semibold transition-all duration-300 relative;
  background: transparent;
  border: none;
  box-shadow: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.nav-link:hover {
  @apply text-white;
  background: transparent;
  border: none;
  box-shadow: none;
}

.nav-link-active {
  @apply text-white;
  background: transparent;
  border: none;
  box-shadow: none;
}

/* Estilos para navegación móvil */
.mobile-nav-link {
  @apply flex items-center px-4 py-4 text-gray-200 font-semibold rounded-lg transition-all duration-300 mb-2;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(220, 38, 38, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.mobile-nav-link:hover {
  @apply text-white;
  background: rgba(220, 38, 38, 0.3);
  border-color: rgba(220, 38, 38, 0.5);
}

.mobile-nav-link-active {
  @apply text-white;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.4), rgba(139, 92, 246, 0.3));
  border-color: rgba(220, 38, 38, 0.6);
}

/* Animación suave para el menú móvil */
.md\:hidden {
  transition: all 0.3s ease-in-out;
}

/* Efecto de brillo para el logo */
.cinema-glow {
  transition: all 0.3s ease;
}

.cinema-glow:hover {
  filter: drop-shadow(0 0 10px rgba(220, 38, 38, 0.6));
}
</style>