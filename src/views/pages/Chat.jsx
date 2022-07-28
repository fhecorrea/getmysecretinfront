import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputField from '../components/fields/InputField';
import Secretize from '../../utils/secretize';

import {connect, useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  messagesSyncing,
  //messagesSynced,
  messageReceived,
  messageRead
} from "../../slices/messagesSlice";

const Chat = (props) => {

  const { id } = useParams();
  const users = useSelector(state => state.users);
  const navigate = useNavigate();
  
  const [secretText, setSecretText] = useState("");
  const [messageText, setMessageText] = useState("");

  let inLineUser = users.data.find(u => u.id.toString() === id);

  const handleExit = (e) => {
    navigate('/', { replace: true });
  };

  document.title = `Conversa com ${inLineUser.username} :: GetMySecret`;

  const onSubmitMessage = (e) => {
    e.preventDefault();
    console.log(`Texto de mensagem enviado ao usuário ${inLineUser.name}: ${messageText}`);
    sendMessage();
    setMessageText("");
  };

  const onSubmitSecretText = (e) => {
    e.preventDefault();
    console.log(`Texto secreto enviado ao usuário ${inLineUser.name}: ${secretText}`);
    sendMessage(true);
    setSecretText("");
  };

  // BEGIN Temp struct
  
  let dispatch = useDispatch();
  const messages = useSelector(state => state.messages);

  //dispatch(messagesSyncing());

  const fakeAsync = async (callback) => {
    await setTimeout(callback, 1000);
  };

  const sendMessage = (isSecret=false) => {

    dispatch(messagesSyncing());

    fakeAsync(async () => {
      
      let text = "";
      if (isSecret) {
        text = await Secretize.encrypt(secretText);
      } else {
        text = messageText;
      }
  
      dispatch(messageReceived({
        id: Date.now(),
        text,
        sender_id: 1,
        receiver_id: inLineUser.id,
        secret: isSecret
      }));

      if (isSecret)
        setSecretText("");
      else
        setMessageText("");
    });
  };
  
  // END Temp struct

  const toggleSecretText = async () => {
    
    if (messages.length < 1)
      return;
    
    let msgs = messages.data.filter(m => m.secret);
    if (msgs.length < 1)
      return;
    
    for (let midx = 0; midx < msgs.length; midx++) {
      msgs[midx] = {
        ...msgs[midx],
        text: await Secretize.decrypt(msgs[midx].text)
      };
      //console.log(msgs[midx]);
    }
    //console.log(msgs)
    dispatch(messageRead());
  };

  return (
    <>
      <Container fluid>
        <h4>Conversando com {inLineUser.name}<small>(<Button variant="link" onClick={handleExit}>sair</Button>)</small></h4>
        {/* Início da caixa com troca de mensagens*/}
        <Row>
          <Col className='col-12'>
            <div style={{height: "12em", backgroundColor: "#ffcc00", borderRadius: "4px"}}>
              {messages.loading
                  ? (<em>Carregando as mensagens...</em>)
                  : (messages && messages.data && messages.data.length && messages.data.filter(c => c.secret === false).length) 
                    ? (<div>{messages.data.filter(c => c.secret === false).map(m => (<div key={m.id}><em><b>{m.sender_id}</b> disse:</em>&nbsp;{m.text}</div>))}</div>)
                    : (<em>Não há mensagens enviadas/recebidas ainda</em>)
              }
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
        {/* Caixas com mensagens secretas */}
        <Row>
          <Col>
            <div style={{height: "8em", backgroundColor: "#cc00ee", borderRadius: "6px"}}>
              {messages.loading
                ? (<em>Carregando as mensagens...</em>)
                : (messages && messages.data && messages.data.length && messages.data.filter(c => c.secret === true)) 
                  ? (<div>{messages.data.filter(c => c.secret === true).map(m => (<div key={m.id}><em><b>{m.sender_id}</b> enviou:</em>&nbsp;{m.text.toString()}</div>))}</div>)
                  : (<em>Não há segredos recebidos ainda</em>)
              }
            </div>
          </Col>
          <Col className='col-auto'>
            <div className='row py-1'>
              <div className="col-12">
                {/* 
                  TODO: Habilitar comportamento de descriptografia do dado
                        e remoção do mesmo da lista de mensagens enviadas
                        no botão abaixo.
                        Continuar com a construção da API em Python. 
                        Estudar o uso ou não de functions considerando o tempo
                        disponível para construir e fazer deploy da API em uma
                        núvem (possivelmente a Azure)
                */}
                <Button
                  variant="light"
                  type='button'
                  onClick={toggleSecretText}
                  disabled={!messages || (messages.data.length < 1) || (messages.data.filter(m => !m.secret).length < 1)}
                >
                  Ver
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