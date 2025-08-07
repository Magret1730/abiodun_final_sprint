import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/Cart.jsx';
// import { CounterProvider } from './context/Counter.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        {/* <CounterProvider> */}
          <App />
        {/* </CounterProvider> */}
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
)
