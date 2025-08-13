# E-Commerce Web Application (React)

A fully functional **E-Commerce Web Application** built with **React** that allows users to browse products, view details, add items to a cart, and proceed through a checkout process.   This project uses a **mock server (JSON Server)** to simulate backend API interactions for seamless development and testing.

---

## Features

### 1. **Product Listing Page**
- Displays a grid or list of products fetched from the mock API.
- Each product card shows:
  - Product image
  - Name
  - Price
  - Add to Cart button

### 2. **Product Details Page**
- Displays:
  - Larger product image
  - Detailed description
  - Price
  - Available quantity
- Option to **add the product to the cart**.

### 3. **Shopping Cart**
- Displays all products added to the cart.
- Shows the **total price** of items.
- Allows users to:
  - Remove products
  - Update quantities.

### 4. **Shopping Cart Context**
- Implements React Context to manage cart state globally.

### 5. **Checkout Page**
- Shows cart summary before checkout.
- Simulated payment/checkout process.
- Displays confirmation message upon completion.

---

## Mock API

A **JSON Server** mock API is used to simulate backend endpoints:

| Method | Endpoint         | Description                          |
|--------|------------------|--------------------------------------|
| GET    | `/products`      | Fetch all products                   |
| GET    | `/products/:id`  | Fetch details for a specific product |
| PUT    | `/products/:id`  | Update details for a specific product|
| DELETE | `/products/:id`  | Delete a specific product            |
| POST   | `/cart`          | Add a product to the cart            |
| GET    | `/cart`          | Retrieve cart items                  |
| DELETE | `/cart/:id`      | Remove a product from the cart       |

---

## Testing

The project includes some unit tests used to test various components using **React Testing Library** + **Vitest**.

Example test coverage:
- Checkout page
- About page
- Payment page

---

## Tech Stack
- **Frontend:** React, React Router
- **State Management:** React Context API
- **Mock Backend:** JSON Server
- **Testing:** React Testing Library, Vitest

---

## Installation & Setup

1. **Clone the repository**
```
git clone https://github.com/Magret1730/abiodun_final_sprint.git
cd abiodun_final_sprint
```

2. **Install dependencies**
```
npm install
```

3. **Start the mock server**
```
npx json-server --watch db.json --port 5000
```

4. **Run the development server**
```
npm run dev
```

5. **Run tests**
```
npm run test
```

## 👥 Project Contributions
This project was solely developed by **Abiodun Magret Oyedele**, covering the backend, frontend, UI/UX design, and overall project execution.
