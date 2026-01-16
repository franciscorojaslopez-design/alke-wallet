# 💳 Alke Wallet

Alke Wallet es una aplicación web que simula una billetera digital.  
Permite iniciar sesión, visualizar saldo, realizar depósitos, enviar dinero a contactos, agregar nuevos contactos y revisar el historial de transacciones.

El proyecto fue desarrollado utilizando **HTML, CSS, JavaScript, jQuery, Bootstrap y LocalStorage**, sin backend, simulando la lógica de negocio en el navegador.

---

## 📁 Estructura del Proyecto
alke_wallet/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── index.html
├── login.html
├── menu.html
├── deposit.html
├── sendmoney.html
├── transactions.html
└── readme.md
---

## 🧰 Tecnologías Utilizadas

- **HTML**: Estructura de las vistas.
- **CSS**: Estilos personalizados.
- **Bootstrap**: Componentes visuales y diseño responsive.
- **JavaScript**: Lógica de negocio.
- **jQuery**: Manejo de eventos y manipulación del DOM.
- **LocalStorage**: Persistencia de datos en el navegador.

---

## 🤖 Apoyo en el Desarrollo

Durante el desarrollo del proyecto se utilizó **ChatGPT 5.2 y Gemini 3** como herramienta de apoyo para:
- Resolución de dudas conceptuales
- Refactorización de código
- Buenas prácticas en JavaScript y jQuery

Todas las decisiones de diseño, implementación y validación fueron realizadas por el autor.

## 🔐 Credenciales de Acceso

Para ingresar a la aplicación:

- **Correo:** "usuario@mail.com"
- **Contraseña:** "1234"

> ⚠️ El sistema de login es simulado y no utiliza backend.

---

## 🚀 Flujo de la Aplicación

### 1️⃣ Pantalla de carga (index.html)
- Simula una carga inicial.
- Redirige automáticamente al login.

### 2️⃣ Login (login.html)
- Validación básica de credenciales.
- Redirección al menú principal si los datos son correctos.

### 3️⃣ Menú Principal (menu.html)
- Visualización del saldo disponible.
- Acceso rápido a:
  - Depósitos
  - Envío de dinero
  - Historial de movimientos

### 4️⃣ Depósitos (deposit.html)
- Permite ingresar un monto.
- Actualiza el saldo.
- Registra el movimiento como **ingreso**.
- Muestra confirmación con modal Bootstrap.

### 5️⃣ Envío de Dinero (sendmoney.html)
- Selección de contactos existentes.
- Creación de nuevos contactos (persisten con LocalStorage).
- Validación de saldo.
- Registro del movimiento como **egreso**.
- Confirmación mediante modal.

### 6️⃣ Movimientos (transactions.html)
- Listado completo de transacciones.
- Filtros por:
  - Todos
  - Ingresos
  - Egresos

---

## 💾 Persistencia de Datos

La aplicación utiliza **LocalStorage** para guardar:

- Saldo del usuario
- Historial de transacciones
- Contactos agregados

Esto permite que la información se mantenga incluso al recargar la página.

---

## ⚠️ Consideraciones

- No existe backend ni base de datos real.
- El proyecto es una simulación educativa.
- No incluye autenticación real ni seguridad avanzada.

---

## 👨‍💻 Autor

Proyecto desarrollado como ejercicio práctico de frontend y lógica de negocio en JavaScript.