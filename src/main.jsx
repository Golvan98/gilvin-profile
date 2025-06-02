import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import MyHeadSpace from './Components/MyHeadSpace.jsx';
import YourHeadSpace from './Components/YourHeadSpace.jsx';







const router = createBrowserRouter([
  { path: '/', element: <App/>},
  { path: '/myHeadSpace', element:<MyHeadSpace/>},
  { path: '/yourHeadSpace', element: <YourHeadSpace/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
