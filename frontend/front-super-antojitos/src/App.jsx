// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import SaleForm from './pages/SaleForm';
import Home from './pages/Home';
import DetallesVentas from './pages/DetallesVentas';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-fill">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="/ventas" element={<SaleForm />} />
            <Route path="/detalles" element={<DetallesVentas/>} />
            {/* Agrega otras rutas aquí si es necesario */}
          </Routes>
        </main>
        
      </div>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
