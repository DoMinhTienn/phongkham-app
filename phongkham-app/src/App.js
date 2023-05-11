
import React, { useReducer, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/header';
import Footer from './layout/footer';
import Home from './components/home.js';
import Login from './components/login';
import myReducer from './reducers/UserReducer';
import cookies from 'react-cookies';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './components/register';
import DangKyKham from './components/dangkykham';

export const UserContext = createContext()

function App() {

  const [user, dispatch] = useReducer(myReducer, cookies.load('user'))

  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, dispatch]}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dangkykham" element={<DangKyKham />} />
        </Routes>
        <Footer/>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
