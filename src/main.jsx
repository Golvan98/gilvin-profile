import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import MyHeadSpace from './Components/MyHeadSpace.jsx';







const router = createBrowserRouter([
  { path: '/', element: <App/>},
  { path: '/myHeadSpace', element:<MyHeadSpace/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
