// src/pages/Clientes.jsx
import React, { useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';
import CustomerDetail from '../components/CustomerDetail';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Clientes = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCustomerSubmit = (customer) => {
    if (customer.id) {
      axios.put(`http://localhost:3001/customer/updateData/${customer.id}`, customer)
        .then(() => {alert('Customer updated')
          console.log(customer)
        })
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:3001/customer/createData', customer)
        .then(() => alert('Customer created'))
        .catch(error => console.error(error));
    }
    setSelectedCustomer(null);
  };

  return (
    <>
      <CustomerForm
        customerId={selectedCustomer ? selectedCustomer.id : null}
        initialData={selectedCustomer}
        onFormSubmit={handleCustomerSubmit}
      />
      <CustomerList onSelectCustomer={setSelectedCustomer} />
      <CustomerDetail customer={selectedCustomer} />
      </>
  );
};

export default Clientes;
