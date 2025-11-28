<script setup>
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app" class="min-h-screen bg-cinema-dark">
    <!-- Background Pattern -->
    <div class="fixed inset-0 bg-cinema-gradient opacity-50"></div>
    <div class="fixed inset-0" style="background-image: radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)"></div>
    
    <!-- Content -->
    <div class="relative z-10">
      <!-- Navegación -->
      <NavBar />
      
      <!-- Contenido principal -->
      <main class="container mx-auto px-4 py-8">
        <RouterView />
      </main>
      
      <!-- Footer -->
      <footer class="bg-cinema-darker/80 backdrop-blur-md border-t border-cinema-red/20 text-white py-16 mt-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <!-- Marca y descripción -->
            <div class="lg:col-span-2">
              <div class="flex items-center mb-6">
                <div class="w-10 h-10 bg-cinema-red rounded-xl flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold bg-gradient-to-r from-cinema-red to-cinema-accent bg-clip-text text-transparent">
                  CineFlix
                </h3>
              </div>
              <p class="text-gray-300 mb-6 max-w-md leading-relaxed">
                Tu plataforma definitiva para descubrir y explorar las mejores películas de todos los tiempos. 
                Desde clásicos atemporales hasta los últimos estrenos.
              </p>
              <div class="flex space-x-4">
                <div class="glass-card p-3 rounded-lg">
                  <svg class="w-5 h-5 text-cinema-red" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="glass-card p-3 rounded-lg">
                  <svg class="w-5 h-5 text-cinema-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="glass-card p-3 rounded-lg">
                  <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Enlaces rápidos -->
            <div>
              <h4 class="text-white font-semibold mb-4">Explorar</h4>
              <ul class="space-y-3">
                <li>
                  <router-link to="/" class="text-gray-400 hover:text-cinema-red transition-colors duration-200 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Inicio
                  </router-link>
                </li>
                <li>
                  <router-link to="/listado" class="text-gray-400 hover:text-cinema-red transition-colors duration-200 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                    Catálogo
                  </router-link>
                </li>
                <li>
                  <router-link to="/favoritos" class="text-gray-400 hover:text-cinema-red transition-colors duration-200 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    Favoritos
                  </router-link>
                </li>
                <li>
                  <span class="text-gray-400 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Tendencias
                  </span>
                </li>
              </ul>
            </div>

            <!-- Géneros populares -->
            <div>
              <h4 class="text-white font-semibold mb-4">Géneros Populares</h4>
              <ul class="space-y-3">
                <li class="text-gray-400 hover:text-cinema-accent transition-colors duration-200 cursor-pointer flex items-center">
                  <span class="w-2 h-2 bg-cinema-red rounded-full mr-3"></span>
                  Acción
                </li>
                <li class="text-gray-400 hover:text-cinema-accent transition-colors duration-200 cursor-pointer flex items-center">
                  <span class="w-2 h-2 bg-cinema-accent rounded-full mr-3"></span>
                  Drama
                </li>
                <li class="text-gray-400 hover:text-cinema-accent transition-colors duration-200 cursor-pointer flex items-center">
                  <span class="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Comedia
                </li>
                <li class="text-gray-400 hover:text-cinema-accent transition-colors duration-200 cursor-pointer flex items-center">
                  <span class="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Ciencia Ficción
                </li>
                <li class="text-gray-400 hover:text-cinema-accent transition-colors duration-200 cursor-pointer flex items-center">
                  <span class="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Terror
                </li>
              </ul>
            </div>
          </div>

          <!-- Línea divisoria -->
          <div class="border-t border-cinema-red/20 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
              <div class="text-sm text-gray-500 mb-4 md:mb-0">
                <p>© 2025 CineFlix. Desarrollado para fines educativos.</p>
                <p class="mt-1">Datos proporcionados por The Movie Database (TMDB)</p>
              </div>
              
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-500">Hecho con</span>
                <div class="flex items-center space-x-2">
                  <div class="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                    <span class="text-white text-xs font-bold">V</span>
                  </div>
                  <span class="text-sm text-gray-400">Vue.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0a0a0a;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #dc2626, #991b1b);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #ef4444, #dc2626);
}

button:focus,
input:focus,
select:focus {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}

html {
  scroll-behavior: smooth;
}

.glass {
  background: rgba(26, 26, 26, 0.3);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.glass-card {
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.8), rgba(10, 10, 10, 0.9));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(220, 38, 38, 0.3);
}

.cinema-glow {
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
  transition: box-shadow 0.3s ease;
}

.cinema-glow:hover {
  box-shadow: 0 0 30px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3);
}

.text-cinema-gradient {
  background: linear-gradient(135deg, #dc2626, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
</style>
