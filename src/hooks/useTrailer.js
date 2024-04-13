import {useQuery} from '@tanstack/react-query'
import api2 from '../utils/api'

const fetchTrailer=({movie_id})=>{
  return api2.get(`/movie/${movie_id}/videos`)
}

export const useTrailerQuery=({movie_id})=>{
  return useQuery({
    queryKey:['movie-trailer',movie_id],
    queryFn:()=>fetchTrailer({movie_id}),
    select:(result)=>result.data.results,
    // staleTime:300000//5분
  })
}