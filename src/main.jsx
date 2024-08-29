import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from 'react-redux';
import {Toaster} from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import store from './store/store.jsx';




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <main className="dark text-white bg-[#0f0f10]">
        <Provider store={store}>
          <Toaster />
          <App />
        </Provider>
      </main>
    </NextUIProvider>
  </StrictMode>
);
