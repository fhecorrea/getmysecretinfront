import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom';
import InputField from "../fields/InputField";

export default function Login (props) {

  document.title = props.title ?? "Acesse sua conta!";
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(props?.admin);
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = React.useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(`Usuário: ${username}\nSenha: ${password}`);
  };

  return (
    <div>
      <Container fluid>
        <Card className="p-4">
          <h2>{isAdmin ? "Acesso restrito" : "Acesse sua conta!"}</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Row>
              <Col className="col-auto">
                <InputField 
                  id="username"
                  label="Usuário"
                  type="text"
                  size="lg"
                  changeHandler={setUsername}
                />
              </Col>
            </Row>
            <Row>
              <Col className="col-auto">
                <InputField
                  id="passwd"
                  type="password"
                  label="Senha"
                  size="lg"
                  changeHandler={setPassword}
                />
              </Col>
            </Row>
            {!isAdmin ? (
              <Row>
                <Col className="col-auto">
                  <Link to="/acesso-restrito">Acesso restrito</Link>
                </Col>
              </Row>
            ) : ""}
            <Row>
              <Col className="col-auto">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!(username && password)}
                >
                  ENTRAR
                </Button>
              </Col>
            </Row>
          </form>
        </Card>
      </Container>
    </div>
  );
}