import {useQuery} from '@tanstack/react-query'
import api2 from '../utils/api2'

const fetchReviews=({movie_id})=>{
  // console.log('리뷰fetch',movie_id)
  return api2.get(`/movie/${movie_id}/reviews`)
}

export const useReviewsQuery=({movie_id})=>{
  // console.log('리뷰쿼리',movie_id)
  return useQuery({
    queryKey:['movie-reviews',movie_id],
    queryFn:()=>fetchReviews({movie_id}),
    select:(result)=>result.data.results,
    // staleTime:300000//5분
  })
}