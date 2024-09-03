
# Supermercado Antojitos

Un sistema automatizado que permite el control efectivo de las ventas diarias y el inventario de productos. Este sistema debe capturar los datos de cada venta, incluyendo la identificación del cliente, los productos adquiridos, y el total a pagar, garantizando que no se vendan unidades de producto que no estén disponibles en el inventario.

Entonces se cuenta con 3 microservicios:
- **apicustomers**: Un CRUD para la gestion de la informacion de los clientes.
- **apiproducts**: Un CRUD para la gestion de los products
- **apisales**: Un CRUD para la gestion de las ventas que se vinculan a un cliente y a ciertos productos que esten dentro de la compra.


## Instrucciones para Ejecutar el Proyecto

### Requisitos Previos
- Docker y Docker Compose instalados en tu sistema.

### Configuración Inicial
 
 1. **Clonar el Repositorio:**

```bash
git clone https://github.com/LeonardoYaranga/SupermercadoAntojitosG4.git

cd SupermercadoAntojitosG4
```

### Ejecución del backend con Docker


**Instalar dependencias:**

Dirigirse a cada api del backend para instalar sus dependencias

apisales
```bash
SupermercadoAntojitosG4/backend/apisales
npm i
```

apiproducts
```bash
SupermercadoAntojitosG4/backend/apiproducts
npm i
```
apiproducts
```bash
SupermercadoAntojitosG4/backend/apiproducts
npm i
```

 **Levantar los Contenedores:**

Posteriormente digirse a la raiz del backend y usar el comando para levantar todos los microservicios a la vez.
```bash
SupermercadoAntojitosG4/backend

docker-compose up --build -d
```

**Ejecución de pruebas backend**

Como extra tenemos la pruebas para esto podemos dirigirnos a la ubicacion de cada api individualmente como lo hicimos para instalar sus dependencias y ejecutar los tests unitarios verificando que todo vaya a funcionar correctamente(Existe test para cada api).

```bash
npm run test
```

### Ejecución del frontend

 **Levantar los Contenedores:**
 Dirigirse a la ubicacion del frontend, intalar las dependencias y correr el proyecto

 ```bash
SupermercadoAntojitosG4/frontend/front-super-antojitos

npm i

npm run dev
```

Nuestro proyecto debe estar corriendo en http://localhost:5173. Ahora podemos probar su funcionalidad en cada apartado.






