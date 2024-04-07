import './App.css';
import AppLayout from './layout/AppLayout';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Movies from './pages/Movies/Movies';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


//홈페이지 /
//전체영화 페이지(서치) /movies 
//디테일 페이지 /movies/:id
//추천영화 /movies/:id/recommandation
//리뷰 /movies/:id/reviews

function App() {
  return (
    <div className='App'>

    <Routes>
      <Route path='/' element={<AppLayout/>}>
        <Route index element={<Homepage/>}/>
        <Route path='movies'>
          <Route index element={<Movies/>}/>
          <Route path=':id' element={<MovieDetail/>}/>
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    </div>
  );
}



export default App;
