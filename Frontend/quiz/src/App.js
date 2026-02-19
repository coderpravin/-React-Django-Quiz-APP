import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from  "./components/Login";
import Signup from './components/Signup';
import LoginSucess from './components/LoginSucess';
import QuizDetail from "./components/QuizDetail";

function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login-success/' element={<LoginSucess></LoginSucess>}></Route>
        <Route path="/quiz/:id" element={<QuizDetail />} />
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
