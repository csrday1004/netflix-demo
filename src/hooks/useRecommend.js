import {useQuery} from '@tanstack/react-query'
import api2 from '../utils/api'

const fetchRecommend=({movie_id})=>{
  return api2.get(`movie/${movie_id}/recommendations`)
}

export const useRecommendQuery=({movie_id})=>{
  return useQuery({
    queryKey:['movie-recommend',movie_id],
    queryFn:()=>fetchRecommend({movie_id}),
    select:(result)=>result.data.results,
    staleTime:300000//5분
  })
}