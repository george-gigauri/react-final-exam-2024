import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReptileDetails from './pages/details/ReptileDetails';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/reptiles/:id' element={<ReptileDetails />} />
      </Routes>
    </div>
  );
}

export default App;
