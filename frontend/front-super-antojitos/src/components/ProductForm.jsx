// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductForm = ({ product, show, handleClose, handleCreateOrUpdate }) => {
  const [formData, setFormData] = useState({
    description: '',
    price: '',
    stock: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateOrUpdate({ ...product, ...formData });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción del producto"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio del producto"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Stock del producto"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            <Button variant="primary" type="submit">Guardar Cambios</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
