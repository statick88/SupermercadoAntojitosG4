import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import ProductForm from '../components/ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to fetch products from the API
  const fetchProductsList = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/product/getData');
      const data = response.data;
      if (data && typeof data === 'object') {
        // Convert object to array
        const productsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProducts(productsArray);
      } else {
        setProducts([]);
        console.error('La respuesta no es un objeto o está vacía:', data);
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/product/deleteData/${id}`);
      // Refresh the list after deletion
      fetchProductsList();
      alert('Producto eliminado');
    } catch (error) {
      console.error('Error eliminando el producto:', error);
      alert('Error al eliminar el producto');
    }
  };

  const handleCreateOrUpdate = async (product) => {
    const { id, ...productData } = product; // Separate the id from the product data

    // Ensure productData fields are of the correct type
    const validatedProductData = {
      description: productData.description || '',
      price: parseFloat(productData.price) || 0,
      stock: parseInt(productData.stock, 10) || 0
    };

    try {
      if (id) {
        await axios.put(`http://localhost:3000/product/updateData/${id}`, validatedProductData);
        // Refresh the list after update
        fetchProductsList();
        alert('Producto actualizado');
      } else {
        const response = await axios.post('http://localhost:3000/product/createData', validatedProductData);
        // No need to manually add the new product to state as fetchProductsList() will refresh the list
        fetchProductsList(); // Re-fetch to get the new product with the assigned ID
        alert('Producto creado');
      }
    } catch (error) {
      console.error('Error guardando el producto:', error);
      alert('Error al guardar el producto');
    } finally {
      handleClose();
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">Error cargando los datos: {error.message}</Alert>;

  return (
    <div className="container mt-4">
      <h2>Lista de Productos</h2>
      <Button variant="primary" onClick={() => { setSelectedProduct(null); setShowModal(true); }}>Nuevo Producto</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td className="text-center">
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(product)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleDelete(product.id)}>Borrar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No hay productos disponibles</td>
            </tr>
          )}
        </tbody>
      </Table>

      {showModal && (
        <ProductForm
          product={selectedProduct}
          show={showModal}
          handleClose={handleClose}
          handleCreateOrUpdate={handleCreateOrUpdate}
        />
      )}
    </div>
  );
};

export default ProductList;
