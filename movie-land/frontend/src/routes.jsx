import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MovieDetails from './pages/MovieDetails';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import MovieList from './pages/MovieList';
import MovieEdit from './pages/MovieEdit';
import MovieInsert from './pages/MovieInsert';

const MovieLandRoutes = () => (
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/movie/:id' element={<MovieDetails />} />
    <Route path='/movie-insert' element={<MovieInsert />} />
    <Route path='/admin/userlist' element={<UserList />} />
    <Route path='/admin/user/:id/edit' element={<UserEdit />} />
    <Route path='/admin/movielist' element={<MovieList />} />
    <Route path='/admin/movie/:id/edit' element={<MovieEdit />} />
    <Route path='/' element={<Home />} exact />
  </Routes>
);

export default MovieLandRoutes;
