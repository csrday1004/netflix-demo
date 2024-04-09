import {useQuery} from '@tanstack/react-query'
import api from '../utils/api'

const fetchTopRatedMovies=()=>{
  // baseURL
  return api.get(`/movie/top_rated`)
}

export const useTopRatedMoviesQuery = ()=>{
  return useQuery({
    // queryKey는 캐시 관리용으로 쓰임
    queryKey:['movie-top-rated'],
    queryFn:fetchTopRatedMovies,
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
