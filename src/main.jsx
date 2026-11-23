import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import AffiliateLayout from './components/AffiliateLayout.jsx';
import Login from './pages/Login.jsx';
import PrimeiroAcesso from './pages/PrimeiroAcesso.jsx';
import Inicio from './pages/Inicio.jsx';
import Eventos from './pages/Eventos.jsx';
import Vendas from './pages/Vendas.jsx';
import Conta from './pages/Conta.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/primeiro-acesso" element={<PrimeiroAcesso />} />
        <Route element={<AffiliateLayout />}>
          <Route index element={<Inicio />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="vendas" element={<Vendas />} />
          <Route path="conta" element={<Conta />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
