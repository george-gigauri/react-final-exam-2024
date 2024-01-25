import './App.css';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReptileDetails from './pages/details/ReptileDetails';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/registration/SignUpPage';
import CreateNewReptilePage from './pages/add_new_reptile/CreateNewReptilePage';
import { AuthContext } from './pages/auth/AuthContext';
import { useEffect, useState } from 'react';
import Const from './util/Const';

function App() {

  const [jwtToken, setJwtToken] = useState(localStorage.getItem(Const.LOCAL_STORAGE_KEY_JWT_TOKEN));
  const [isSignedIn, setIsSignedIn] = useState(jwtToken != null);

  useEffect(() => {
    setIsSignedIn(jwtToken != null);
  }, [jwtToken]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ jwtToken, setJwtToken, isSignedIn }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/reptiles/:id' element={<ReptileDetails />} />
          <Route path='/reptiles/create' element={<CreateNewReptilePage />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
