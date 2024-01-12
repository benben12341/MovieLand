import './App.css';
import Navbar from './components/Navbar';
import MovieLandRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <main className='content'>
          <MovieLandRoutes />
        </main>
      </Router>
    </div>
  );
}

export default App;
