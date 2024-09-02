import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaleForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [detail, setDetail] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
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
        setCustomers([]);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!customerId) return;

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
        setProducts([]);
      }
    };

    fetchProducts();
  }, [customerId]);

  const handleAddProduct = () => {
    const selectedProduct = products.find((product) => product.id === productId);

    if (!selectedProduct) {
      alert('Producto no válido seleccionado');
      return;
    }

    if (quantity > selectedProduct.stock) {
      alert(`Stock insuficiente para ${selectedProduct.description}`);
      return;
    }

    const newDetail = {
      productId,
      quantity,
      totalPrice: selectedProduct.price * quantity,
    };

    setDetail([...detail, newDetail]);
    setTotalPrice(totalPrice + newDetail.totalPrice);
    setProductId('');
    setQuantity(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (detail.length === 0) {
      setError('Debes agregar al menos un producto al detalle de la venta.');
      return;
    }

    const saleData = {
      customerId,
      date: new Date().toISOString(),
      detail,
    };

    try {
      await axios.post('http://localhost:3005/sale/createData', saleData);

      for (let item of detail) {
        const updatedProduct = products.find((product) => product.id === item.productId);
        const newStock = updatedProduct.stock - item.quantity;

        await axios.put(`http://localhost:3006/product/updateData/${item.productId}`, {
          description: updatedProduct.description,
          price: updatedProduct.price,
          stock: newStock,
        });
      }

      alert('Venta registrada exitosamente');

      setCustomerId('');
      setDetail([]);
      setTotalPrice(0);
      setProducts([]);

    } catch (error) {
      console.error('Error registrando la venta o actualizando stock:', error);
      alert('Error registrando la venta o actualizando stock');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Registrar Venta</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Cliente:</label>
          <select
            className="form-select"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          >
            <option value="">Selecciona un Cliente</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} {customer.lastname}
              </option>
            ))}
          </select>
        </div>
        {customerId && (
          <>
            <div className="mb-3">
              <label className="form-label">Producto:</label>
              <select
                className="form-select"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              >
                <option value="">Selecciona un producto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.description} - ${product.price} (Stock: {product.stock})
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Cantidad:</label>
              <input
                type="number"
                className="form-control"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>
            <button type="button" className="btn btn-primary mb-3" onClick={handleAddProduct}>
              Agregar Producto
            </button>
            <h2>Detalles de Venta</h2>
            <ul className="list-group mb-3">
              {detail.map((item, index) => (
                <li key={index} className="list-group-item">
                  {products.find((product) => product.id === item.productId)?.description} - Cantidad: {item.quantity}, Precio Total: ${item.totalPrice.toFixed(2)}
                </li>
              ))}
            </ul>
            <h3>Precio Total: ${totalPrice.toFixed(2)}</h3>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-success">
              Procesar Compra
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SaleForm;
