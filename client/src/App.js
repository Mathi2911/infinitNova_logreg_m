import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import Dashboard from './components/Dashboard';
import UserPage from './components/UserPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Settings from './components/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



