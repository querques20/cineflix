import axios from 'axios'

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQ3OTkyODg2NzcyOTA0OWZkYjJhODA0ZmRiYjZhMSIsIm5iZiI6MTc2MjQ2MzUzOS45NzYsInN1YiI6IjY5MGQwZjMzY2U5YzFmNDhmNzlhYWZkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SJW82M4B92kRhJsFuI7zALIRs1qY1F7gVMxN4kOkBuk' 
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'accept': 'application/json'
  },
  params: {
    language: 'es-ES'
  }
})

export class MovieService {
  static async getPopularMovies(page = 1) {
    try {
      const response = await api.get('/movie/popular', {
        params: { page }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      throw error
    }
  }

  static async getTrendingMovies(timeWindow = 'week') {
    try {
      const response = await api.get(`/trending/movie/${timeWindow}`)
      return response.data
    } catch (error) {
      console.error('Error fetching trending movies:', error)
      throw error
    }
  }

  static async searchMovies(query, page = 1) {
    try {
      const response = await api.get('/search/movie', {
        params: { query, page }
      })
      return response.data
    } catch (error) {
      console.error('Error searching movies:', error)
      throw error
    }
  }

  static async getMovieDetails(movieId) {
    try {
      const response = await api.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,videos,similar'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching movie details:', error)
      throw error
    }
  }

  static async getGenres() {
    try {
      const response = await api.get('/genre/movie/list')
      return response.data.genres
    } catch (error) {
      console.error('Error fetching genres:', error)
      throw error
    }
  }

  static async discoverMoviesByGenre(genreId, page = 1) {
    try {
      const response = await api.get('/discover/movie', {
        params: {
          with_genres: genreId,
          page,
          sort_by: 'popularity.desc'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error discovering movies by genre:', error)
      throw error
    }
  }

  static async getMoviesByRating(certification, page = 1) {
    try {
      const response = await api.get('/discover/movie', {
        params: {
          certification_country: 'US',
          certification: certification,
          page,
          sort_by: 'popularity.desc'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching movies by rating:', error)
      throw error
    }
  }

  static getImageUrl(path) {
    return path ? `${IMAGE_BASE_URL}${path}` : null
  }

  static getBackdropUrl(path) {
    return path ? `${BACKDROP_BASE_URL}${path}` : null
  }

  static formatDate(dateString) {
    if (!dateString) return 'Fecha no disponible'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  static formatRuntime(minutes) {
    if (!minutes) return 'Duración no disponible'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  static formatRating(rating) {
    return {
      value: rating,
      stars: Math.round(rating / 2),
      percentage: (rating * 10)
    }
  }
}

export default MovieService