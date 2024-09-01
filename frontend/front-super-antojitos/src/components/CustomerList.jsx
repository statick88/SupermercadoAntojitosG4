// src/components/CustomerList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import CustomerDetail from './CustomerDetail';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/customer/getData')
      .then(response => {
        const data = response.data;
        if (data && typeof data === 'object') {
          const customersArray = Object.values(data);
          setCustomers(customersArray);
        } else {
          setCustomers([]);
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  const handleDelete = (id) => {
    // Encontrar el cliente por ID en el estado actual (opcional, para confirmar)
    const customerToDelete = customers.find(customer => customer.id === id);
    if (!customerToDelete) {
      console.error('Customer not found');
      return;
    }
  
    console.log('Deleting customer:', customerToDelete);
    axios.delete(`http://localhost:3001/customer/deleteData/${id}`)
      .then(() => {
        alert('Cliente eliminado');
        // Actualizar el estado de los clientes después de la eliminación
        setCustomers(prevCustomers =>
          prevCustomers.filter(customer => customer.id !== id)
        );
      })
      .catch(error => {
        console.error('Error eliminando el cliente:', error);
        alert('Error al eliminar el cliente');
      });
  };

  const handleUpdate = (id, updatedData) => {
    axios.put(`http://localhost:3001/customer/updateData/${id}`, updatedData)
      .then(() => {
        alert('Cliente actualizado');
        setCustomers(prevCustomers =>
          prevCustomers.map(customer =>
            customer.id === id ? { ...customer, ...updatedData } : customer
          )
        );
        handleClose();
      })
      .catch(error => {
        console.error('Error actualizando el cliente:', error);
        alert('Error al actualizar el cliente');
      });
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">Error cargando los datos: {error.message}</Alert>;

  return (
    <div className="container mt-4">
      <h2>Lista de Clientes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(customers) && customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.lastname}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td className="text-center">
                <Button variant="warning" className="me-2" onClick={() => handleEdit(customer)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(customer.id)}>Borrar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedCustomer && (
        <CustomerDetail
          customer={selectedCustomer}
          show={showModal}
          handleClose={handleClose}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default CustomerList;
