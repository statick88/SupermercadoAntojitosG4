// src/components/CustomerDetail.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CustomerDetail = ({ customer, show, handleClose, handleUpdate }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    lastname: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (customer) {
      console.log('Customer received:', customer);
      setFormData({
        id: customer.id || '',
        name: customer.name || '',
        lastname: customer.lastname || '',
        phone: customer.phone || '',
        address: customer.address || ''
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ID:', customer.id);
    console.log('Form data:', customer);
    handleUpdate(customer.id, formData);
  };

  const handleDelete = () => {
    console.log('Deleting customer:', customer);
    axios.delete(`http://localhost:3007/customer/deleteData/${customer.id}`)
      .then(() => {
        alert('Cliente eliminado');
        handleClose();
      })
      .catch(error => {
        console.error('Error eliminando el cliente:', error);
        alert('Error al eliminar el cliente');
      });
  };

  if (!customer) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLastname">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
            <Button variant="primary" type="submit">Guardar Cambios</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomerDetail;
