import { Routes, Route } from 'react-router-dom';
import { Header } from './client/components';
import { Registration } from './client/pages/Registration';
import Dashboard from './client/pages/Dashboard';
import './App.css';
import { HomePage } from './client/pages/HomePage';
import { Login } from './client/pages/Login';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './client/redux/slices/auth';
import { useEffect } from 'react';
import { Profile } from './client/pages/Profile';
import { Bot } from './client/pages/Bot';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Bot/>} /> 
        <Route path="/login" element={<Login/>} /> 
        <Route path="/registration" element={<Registration/>} /> 
        <Route path="/profile/:name" element={<Profile/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  );
};

export default App;
