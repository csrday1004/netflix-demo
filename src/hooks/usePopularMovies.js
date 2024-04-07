import {useQuery} from '@tanstack/react-query'
import api from '../utils/api'

const fetchPopularMovies=()=>{
  // baseURL
  return api.get(`/movie/popular`)
}

export const usePopularMoviesQuery = ()=>{
  return useQuery({
    // queryKey는 캐시 관리용으로 쓰임
    queryKey:['movie-popular'],
    queryFn:fetchPopularMovies,
    select:(result)=>result.data
  })
}

//# api.js
// const api = axios.create({
//   baseURL: 'https://api.themoviedb.org/3',
//   headers: {
//     Accept:'application/json',
//     Authorization: `Bearer ${API_KEY}`
//   }
// });
