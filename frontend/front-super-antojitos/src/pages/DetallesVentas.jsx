import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetalleVentas = () => {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:3005/sale/getData');
        const data = response.data;

        if (data && typeof data === 'object') {
          const salesArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setSales(salesArray);
        } else {
          console.error('Expected an object of sales but got:', data);
          setSales([]);
        }
      } catch (error) {
        console.error('Error fetching sales:', error);
        setError('Error fetching sales data');
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3007/customer/getData');
        const data = response.data;

        if (data && typeof data === 'object') {
          const customersArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setCustomers(customersArray);
        } else {
          console.error('Expected an object of customers but got:', data);
          setCustomers([]);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Error fetching customers data');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3006/product/getData');
        const data = response.data;

        if (data && typeof data === 'object') {
          const productsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setProducts(productsArray);
        } else {
          console.error('Expected an object of products but got:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products data');
      }
    };

    fetchSales();
    fetchCustomers();
    fetchProducts();
  }, []);

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? `${customer.name} ${customer.lastname}` : 'Desconocido';
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.description : 'Desconocido';
  };

  const calculateTotal = (details) => {
    return details.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Detalle de Venta</h1>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => window.location.reload()} // Button to reload the page
      >
        Recargar Datos
      </button>

      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID Venta</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Detalle</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No hay ventas registradas</td>
              </tr>
            ) : (
              sales.map(sale => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{getCustomerName(sale.customerId)}</td>
                  <td>{new Date(sale.date).toLocaleDateString()}</td>
                  <td>
                    <ul className="list-unstyled">
                      {sale.detail.map((item, index) => (
                        <li key={index} className="mb-1">
                          <div><strong>• Producto:</strong> {getProductName(item.productId)}</div>
                          <div><strong>Cantidad:</strong> {item.quantity}</div>
                          <div><strong>Precio Total:</strong> ${item.totalPrice ? item.totalPrice.toFixed(2) : 'N/A'}</div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${calculateTotal(sale.detail).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetalleVentas;
