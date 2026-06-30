import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Import Bootstrap CSS
import './vendor/bootstrap/css/bootstrap.min.css';

// Import Assets CSS
import './assets/css/fontawesome.css';
import './assets/css/templatemo-villa-agency.css';
import './assets/css/owl.css';
import './assets/css/animate.css';
import './assets/css/flex-slider.css';
import './assets/css/custom-animations.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
