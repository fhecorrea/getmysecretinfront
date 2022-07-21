import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  BrowserRouter,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Login from "./views/pages/Login";

//import logo from './logo.svg';
//import './App.css';

export default function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
      <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">Sobre</Link>
          </li>
        </ul>

        <Routes>
          <Route
            path="/login"
            element={<Login />} 
          />
          <Route
            path="/about"
            element={<About />} 
          />
          <Route
            path="/"
            element={<Home />} 
          />
          <Route 
            path="*"
            element={<NoMatch />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h2>Bem vindo ao Get My Secret!</h2>
      <h3>Sua maneira segura e eficiente de compartilhar informações!</h3>
      <br />
      <hr />
      <br />
      <br />
      <p>Clique no botão para iniciar uma interação com um usuário.</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>Sobre este projeto!</h2>
      <p>'Projetinho' desenvolvido como forma de atividade prática no bootcamp desenvolvido pela TOTVS em parceria com o SENAI.</p>
      <p>Esta aplicação não tem por objetivo servir de base ou referência alguma, apenas solução de um problema proposto.</p>
    </div>
  );
}

function NoMatch() {
  const loc = useLocation();

  return (
    <div>
      <h2>Página “{loc.pathname}” não encontrada!</h2>
    </div>
  );
}
