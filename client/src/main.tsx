import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './features/authentication/context/authContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </AuthContextProvider>
);
