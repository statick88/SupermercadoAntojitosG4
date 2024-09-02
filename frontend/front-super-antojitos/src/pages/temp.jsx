import React, { useState } from 'react';
import axios from 'axios';

const Temp = () => {
  const [customerId, setCustomerId] = useState('');
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [detail, setDetail] = useState([]);

  const handleAddProduct = () => {
    // Assuming a static price for simplicity, adjust as needed
    const productPrice = 100; // You may want to fetch this from a database or API
    const newDetail = { productId, quantity, totalPrice: productPrice * quantity };

    setDetail([...detail, newDetail]);
    setTotalPrice(totalPrice + newDetail.totalPrice);
    setProductId('');
    setQuantity(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const saleData = {
      customerId,
      date: new Date().toISOString(),
      detail,
    };

    try {
        console.log(saleData)
      await axios.post('http://localhost:3005/sale/createData', saleData);
      alert('Sale recorded successfully');
    } catch (error) {
      console.error('Error recording sale', error);
      alert('Error recording sale');
    }

    setCustomerId('');
    setDetail([]);
    setTotalPrice(0);
  };

  return (
    <div>
      <h1>Register Sale</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer ID:</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <button type="submit">Submit Sale</button>
      </form>
      <h2>Sale Details</h2>
      <ul>
        {detail.map((item, index) => (
          <li key={index}>
            Product ID: {item.productId}, Quantity: {item.quantity}, Total Price: ${item.totalPrice.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Temp;