import React from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      {/* Carrusel de Imágenes */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/assets/img/super1.jpg"
            alt="First slide"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          {/* <Carousel.Caption>
            <h3>Primera Imagen</h3>
            <p>Descripción de la primera imagen del carrusel.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/assets/img/logo.png"
            alt="Second slide"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          {/* <Carousel.Caption>
            <h3>Segunda Imagen</h3>
            <p>Descripción de la segunda imagen del carrusel.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/assets/img/super3.jpg"
            alt="Third slide"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          {/* <Carousel.Caption>
            <h3>Tercera Imagen</h3>
            <p>Descripción de la tercera imagen del carrusel.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>

      {/* Sección de Información */}
      <Container fluid className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Gestor de Supermercado</Card.Title>
                <Card.Text>
                  <strong>Supermercado Antojitos</strong>, ubicado en el barrio Vivir Bueno, es un negocio que ha operado durante más de 10 años. Actualmente, el registro de ventas se realiza manualmente, lo que ha generado inconsistencias en el control de inventario y pérdidas económicas debido a descuadres y falta de seguimiento en las ventas.
                </Card.Text>
                <Card.Text>
                  La gerencia ha decidido modernizar sus operaciones mediante el desarrollo de un sistema automatizado que permita el control efectivo de las ventas diarias y el inventario de productos. Este sistema debe capturar los datos de cada venta, incluyendo la identificación del cliente, los productos adquiridos, y el total a pagar, garantizando que no se vendan unidades de producto que no estén disponibles en el inventario.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
