import './App.css';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReptileDetails from './pages/details/ReptileDetails';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/registration/SignUpPage';
import CreateNewReptilePage from './pages/add_new_reptile/CreateNewReptilePage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/reptiles/:id' element={<ReptileDetails />} />
        <Route path='/reptiles/create' element={<CreateNewReptilePage />} />
      </Routes>
    </div>
  );
}

export default App;
