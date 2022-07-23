import React, { useState } from 'react';
import {connect, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputField from '../components/fields/InputField';

const Chat = (props) => {

  const { id } = useParams();
  const users = useSelector(state => state.users);
  const [secretText, setSecretText] = useState("");
  const [messageText, setMessageText] = useState("");

  let inLineUser = users.data.find(u => u.id.toString() === id);

  document.title = `Conversa com ${inLineUser.username} :: GetMySecret`;

  const onSubmitMessage = (e) => {
    e.preventDefault();
    console.log(`Texto de mensagem enviado ao usuário ${inLineUser.username}: ${messageText}`);
    setMessageText("");
  };
  const onSubmitSecretText = (e) => {
    e.preventDefault();
    console.log(`Texto secreto enviado ao usuário ${inLineUser.username}: ${secretText}`);
    setSecretText("");
  };

  return (
    <>
      <Container fluid>
        <h4>Conversa com {inLineUser.username}</h4>
        {/* Início da caixa com troca de mensagens*/}
        <Row>
          <Col className='col-12'>
            <div style={{height: "12em", backgroundColor: "#ffcc00", borderRadius: "4px"}}>
              Caixa de texto
            </div>
          </Col>
        </Row>
        {/* Caixa de texto para digitação do usuário */}
        <Row>
          <Col className='col-12'>
            <form onSubmit={onSubmitMessage}>
              <div className="row p-2">
                <div className="col-auto">Mensagem</div>
                <div className="col-8">
                  <textarea className='form-control' onChange={(e) => setMessageText(e.currentTarget.value)} />
                </div>
                <div className="col-auto">
                  <Button variant="primary" type="submit">
                    ENVIAR
                  </Button>
                </div>
              </div>
            </form>
          </Col>
        </Row>
        {/* Caixas com mensagens secretas*/}
        <Row>
          <Col>
            <div style={{height: "8em", backgroundColor: "#cc00ee", borderRadius: "6px"}}>
              Caixa de entrada de textos secretos
            </div>
          </Col>
          <Col className='col-auto'>
            <div className='row py-1'>
              <div className="col-12">
                <Button variant="light" type='button'>
                  Ver/Ocultar
                </Button>
              </div>
            </div>
            <div className='row py-2'>
              <div className="col-12">
                <Button variant="light" type='button'>
                  Copiar
                </Button>
              </div>
            </div>
          </Col>
          <Col className='col-1'>&nbsp;</Col>
          <Col>
            <form onSubmit={onSubmitSecretText}>
              <div className="row">
                <div className="col-10">
                  <InputField
                    id="onedesertflower"
                    type="text"
                    label=""
                    placeholder="Digite sua confidencialidade..."
                    changehandler={setSecretText}
                  />
                </div>
                <div className="col-1">
                  <Button variant="warning" type="submit">
                    ENVIAR (seguro)
                  </Button>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    localUser: state.currentUser,
    remoteUser: state.userToChat
  };
};

export default connect(mapStateToProps)(Chat);