import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import Form from './components/FormsEmulador/Form';
import Login from './components/Login/Login';
import Solicitacao from './components/Solicitacao/Solicitacao';
import Bosch from './components/Images/bosch';
import Aguarde from './components/Solicitacao/Aguarde';
import Aprovacao from './components/Administrador/Aprovacao/Aprovacao';
import AdicionarItem from './components/Administrador/ItensEmulador/AdicionarItem';
import GerenciarItens from './components/Administrador/ItensEmulador/GerenciarItens'
import SemSenha from './components/Login/SemSenha';
import HomeAdm from './components/Home/HomeAdm';
import Home from './components/Home/Home';
import Map from './components/Home/Map';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/homeadmin",
    element: <HomeAdm />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/aprovacao",
    element: <Aprovacao />,
  },
  {
    path: "/formemulador",
    element: <Form />,
  },
  {
    path: "/solicitacao",
    element: <Solicitacao />,
  },
  {
    path: "/aguarde",
    element: <Aguarde />,
  },
  {
    path: "/gerenciaritens",
    element: <GerenciarItens />,
  },
  {
    path: "/adicionaritem",
    element: <AdicionarItem />,
  },
  {
    path: "/recuperacaosenha",
    element: <SemSenha />,
  },
  {
    path: "/mapa",
    element: <Map />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Bosch model={"header"}/>
    <RouterProvider router={router} />
    <Bosch model={"footer"}/>
  </React.StrictMode>,

)