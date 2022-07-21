import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useParams
} from "react-router-dom";

//import logo from './logo.svg';
//import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">Sobre</Link>
          </li>
        </ul>

        <Routes>
          <Route
            path="/about"
            element={<About />} 
          />
          <Route path="/"
            element={<Home />} 
          />
        </Routes>
      </div>
    </Router>
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
