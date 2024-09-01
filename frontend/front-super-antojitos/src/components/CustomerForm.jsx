import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';  // Asegúrate de importar Bootstrap

const CustomerForm = ({ customerId, onFormSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    lastname: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center">{customerId ? 'Actualizar Cliente' : 'Crear Cliente'}</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="id">Cédula</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Cédula"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Apellido"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Celular</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Celular"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Dirección"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                {customerId ? 'Actualizar' : 'Crear'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
