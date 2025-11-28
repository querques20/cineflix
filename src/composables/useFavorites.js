import { ref, computed } from 'vue'

const favorites = ref([])

const loadFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem('movieapp-favorites')
    if (savedFavorites) {
      favorites.value = JSON.parse(savedFavorites)
    }
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error)
    favorites.value = []
  }
}

const saveFavorites = () => {
  try {
    localStorage.setItem('movieapp-favorites', JSON.stringify(favorites.value))
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error)
  }
}

export function useFavorites() {
  if (favorites.value.length === 0) {
    loadFavorites()
  }

  const addToFavorites = (movie) => {
    if (!isFavorite(movie.id)) {
      const favoriteMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview,
        genre_ids: movie.genre_ids || [],
        addedAt: new Date().toISOString()
      }
      
      favorites.value.push(favoriteMovie)
      saveFavorites()
      return true
    }
    return false
  }

  const removeFromFavorites = (movieId) => {
    const index = favorites.value.findIndex(movie => movie.id === movieId)
    if (index > -1) {
      favorites.value.splice(index, 1)
      saveFavorites()
      return true
    }
    return false
  }

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      return removeFromFavorites(movie.id)
    } else {
      return addToFavorites(movie)
    }
  }

  const isFavorite = (movieId) => {
    return favorites.value.some(movie => movie.id === movieId)
  }

  const clearFavorites = () => {
    favorites.value = []
    saveFavorites()
  }

  const sortedFavorites = computed(() => {
    return [...favorites.value].sort((a, b) => {
      return new Date(b.addedAt) - new Date(a.addedAt)
    })
  })

  const favoritesCount = computed(() => favorites.value.length)

  const searchFavorites = (query) => {
    if (!query) return favorites.value
    
    const searchTerm = query.toLowerCase()
    return favorites.value.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm)
    )
  }

  return {
    favorites: sortedFavorites,
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    searchFavorites
  }
}

export default useFavorites