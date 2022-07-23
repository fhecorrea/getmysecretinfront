import React, { useState } from 'react';
import {connect, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {usersLoaded, usersLoading} from '../../../slices/usersSlice';

const UsersModal = (props) => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [active, setActive] = useState(false);

  const retrieveUsers = async () => {

    const currentUserIsAdmin = false;
    console.log("Coletando lista de usuários " + (currentUserIsAdmin ? "comuns" : "administrativos") + "...");
  
    // Lista fake de usuários... Depois serão coletados do servidor...
    const users = [
      { id: 1221, username: "teste1123", isAdmin: !currentUserIsAdmin},
      { id: 86763, username: "outro99181", isAdmin: !currentUserIsAdmin},
      { id: 545333, username: "hahaha9217", isAdmin: !currentUserIsAdmin},
      { id: 34563, username: "matuzalem11", isAdmin: !currentUserIsAdmin},
      { id: 34531, username: "20170correr", isAdmin: !currentUserIsAdmin},
      { id: 145645, username: "774orbeluz66", isAdmin: !currentUserIsAdmin}
    ];
  
    dispatch(usersLoading());
  
    await setTimeout(() => {
      dispatch(usersLoaded(users));
    }, 1000);
  };

  const handleShow = () => {
    retrieveUsers();
    setActive(true);
  };

  const handleClose = () => setActive(false);
  const goToChat = (userId) => {
    const user = props.users.data.find(u => u.id && (u.id === userId));
    console.log(`A CONVERSAR COM O USUÁRIO ${user.username} (ID: ${user.id}).`);
    // Redireciona a página do chat.
    navigate(`/chat/${user.id}`, {replace: true});
  };
    
  return (
    <>
      {/* More at: https://getbootstrap.com/docs/5.0/components/modal/ */}
      <Button
        type="button"
        className={"btn" + (!active ? "btn-primary" : "btn-secondary")}
        data-bs-toggle="modal"
        data-bs-target="#usersModal"
        onClick={handleShow}
      >
        {!active ? "NOVO" : "CANCELAR"}
      </Button>

      {/* Modal block */}
      <Modal 
        show={active}
        id="usersModal"
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title>
            Lista de usuários
          </Modal.Title>
          <Button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          ></Button>
        </Modal.Header>
        <Modal.Body>
          {
            (props.users.loading)
            ?
            (<em>Carregando lista de usuários...</em>)
            :
              (props.users.data && props.users.data.length) 
              ?
                (<ul>{props.users.data.map(u => (<li key={u.id}>{u.username}<Button className="btn btn-sm btn-success" onClick={() => goToChat(u.id) }>&gt;&nbsp;&gt;</Button></li>))}</ul>)
              :
                (<em>Não existe usuário disponível para ser contatado no sistema.</em>)
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//export default UsersModal;
const mapStateToProps = (state) => {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(UsersModal);