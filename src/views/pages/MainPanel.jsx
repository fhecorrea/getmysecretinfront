import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Secretize from '../../utils/secretize';

import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  messagesSyncing,
  //messagesSynced,
  //messageReceived,
  //messageRead,
  messagesSynced
} from "../../slices/messagesSlice";
import { ListGroup } from 'react-bootstrap';
import client from '../../utils/client';

const MainPanel = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [secretText, setSecretText] = useState("");
  const [countdown, setCountdown] = useState(-1);
  const [selectedUser, selectUser] = useState({});

  const messages = useSelector(state => state.messages);
  const users = useSelector(state => state.users);

  const handleExit = (e) => {
    navigate('/', { replace: true });
  };

  document.title = `Painel de mensagens :: GetMySecret`;

  /**
   * Retrieve all unread secrets from server
   */
  const getSecretTexts = () => {
    
    if (countdown >= 0) {
      console.log(`Wait more ${countdown} second(s)...`);
      return false;
    }

    // To prevents multiple requests to server
    startCountdown();
    
    dispatch(messagesSyncing());
  
    client(
      "GET",
      '/secrets/list',
      {'Accept': 'application/json'},
      null,
      true
    )
      .then((m) => {
        console.log(`Buscando mensagens do usuário ${props.user.name} (${props.user.username})...`);
        if (m && m.data && m.data.length >= 0)
          dispatch(messagesSynced(m.data));
      })
      .catch(e => {
        console.log("Failed to retrieve user's received secrets. Error: %s", e);
        dispatch(messagesSynced([]));
      });
  
  };

  /**
   * Select/deselect an user
   * @param Event
   */
  const toggleUser = (e) => {
    const id = e.target.dataset.uid;
    console.log("Selected ID: " + id);
    selectUser(users.data.find(u => u.id === id));
  };

  /**
   * Starts a count down from 5 to zero for prevent user 
   * click on 'Atualizar' button
   */
  const startCountdown = () => {
    let secs = 5;
    setCountdown(secs);
    //if (intervalVar) clearInterval(intervalVar);
    const interval = setInterval(() => {
      console.log('Aguarde mais %d segundo(s)...', secs);
      setCountdown(--secs);
      if (secs < 0) {
        clearInterval(interval);
        console.log("Botão atualizar liberado novamente.");
      }
    }, 1000);
  }

  const onSubmitSecretText = (e) => {
    e.preventDefault();
    console.log(`Texto secreto enviado do usuário ${props.user.name} (${props.user.username}) ao usuário ${selectedUser.name}: ${secretText}`);
    sendSecretText();
    setSecretText("");
  };

  const sendSecretText = () => {

    dispatch(messagesSyncing());

    client(
      "POST",
      '/secrets/send',
      {'Accept': 'application/json'},
      { // Data
        id: Date.now(),
        text: Secretize.encrypt(secretText),
        receiver_id: selectedUser.id,
        receiver_name: selectedUser.name
      },
      true
    )
      .then(() => {
        console.log("Text was sent to user!");
        dispatch(messagesSynced([]));
        setSecretText("");
      })
      .catch(e => console.log("Failed to send text to user. Error: %s", e));
  };
  
  const readSecretTexts = () => {
    
    if (messages.length < 1)
      return;
    
    let msgs = messages.data;
    if (msgs.length < 1) {
      console.log("No messages to read. Nothing to do.");
      return;
    }
    
    const decryptedMessageList = [];
    for (let midx = 0; midx < msgs.length; midx++) {
      decryptedMessageList[midx] = {
        ...msgs[midx],
        text: Secretize.decrypt(msgs[midx].text)
      };
      //console.log(msgs[midx]);
    }
    
    dispatch(messagesSyncing());
  
    client(
      "GET",
      '/secrets/read',
      {'Accept': 'application/json'},
      null,
      true
    )
      .then(() => {
        console.log("Texts was set as read!");
        dispatch(messagesSynced(decryptedMessageList));
      })
      .catch(e => {
        console.log("Failed to send text to user. Error: %s", e);
        dispatch(messagesSynced(messages.data));
      });
  };

  return (
    <>
      <Container fluid>
        {
          selectedUser && selectedUser.name 
          ? (<h4>{`Conversando com ${selectedUser.name}`}</h4>) 
          : (<h4>{`Painel ${process.env.REACT_APP_NAME}`}</h4>)
        }
        <small>(<Button variant="link" onClick={handleExit}>sair</Button>)</small>
        {/* Início da caixa com troca de mensagens*/}
        <Row>
          <Col className='col-12'>
            <ListGroup as='div' style={{height: "12em", backgroundColor: "#ffcc00", borderRadius: "4px", overflowY: 'scroll'}}>
              {messages.loading
                ? (<ListGroup.Item as='em' disabled>Carregando as mensagens...</ListGroup.Item>)
                : (messages && messages.data && messages.data.length) 
                  ? messages.data.map(m => (<ListGroup.Item as='div' key={m.id}><em><b>{m.sender_name}</b> enviou:</em>&nbsp;{m.text.toString()}</ListGroup.Item>))
                  : (<ListGroup.Item as='em'>Não há segredos recebidos ainda</ListGroup.Item>)
              }
            </ListGroup>
          </Col>
        </Row>
        {/* Linha com botões de ação */}
        <Row className='my-2'>
          <Col className='col-7'>
            &nbsp;
          </Col>
          <Col className='col-5 me-auto'>
            <Button 
              className='btn btn-warning'
              onClick={readSecretTexts}
            >
              Ler tudo
            </Button>
            &nbsp;
            <Button 
              className='btn btn-warn'
              onClick={getSecretTexts}
              disabled={(countdown >= 0)}
            >
              {`Atualizar${(countdown >= 0) ? ` (${countdown})` : ''}`}
            </Button>
          </Col>
        </Row>
        <Row>
          {/* Caixa com lista de usuários para seleção */}
          <Col className='col-6'>
            <p>
              Escolha um usuário da lista para quem deseja encaminhar a mensagem secreta.
            </p>
            <ListGroup as='ul' style={{height: '10em', overflowY: 'scroll'}}>
            {messages.loading
                ? (<ListGroup.Item as='li' disabled>Carregando usuários...</ListGroup.Item>)
                : (users && users.data && users.data.length) 
                  ? users.data.map(u => (<ListGroup.Item as='li' action active={selectedUser && selectedUser.id !== undefined && selectedUser.id === u.id} key={u.id} style={{cursor: 'pointer'}} title={`Clique para enviar um segredo para ${u.name}`} onClick={toggleUser} data-uid={u.id}>{u.name}</ListGroup.Item>))
                  : (<ListGroup.Item as='li' disabled>Não há usuários disponíveis para conversar</ListGroup.Item>)
              }
            </ListGroup>
          </Col>
          <Col className='col-1'>&nbsp;</Col>
          {/* Para envio das mensagens secretas */}
          <Col className='col-5'>
            <form onSubmit={onSubmitSecretText}>
              <div className="row">
                <div className="col-10">
                  <input 
                    id="sec_id"
                    type="text"
                    className="form-control"
                    placeholder={`Digite sua confidencialidade${(selectedUser && selectedUser.name !== undefined) ? " para " + selectedUser.name : ""}...`}
                    value={secretText}
                    onChange={(e) => setSecretText(e.currentTarget.value)}
                  />
                </div>
                <div className="col-1">
                  <Button variant="warning" type="submit">
                    ENVIAR
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

export default MainPanel;