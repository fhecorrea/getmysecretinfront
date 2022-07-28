import React from 'react';
import UserModal from '../components/misc/UsersModal';

import { connect } from 'react-redux';

const Home = (props) => {

  document.title = "Dashboard sem gráficos :: GetMySecret";

  return (
    <div>
      <h2>Bem vindo ao {process.env.REACT_APP_NAME}, {props.user.name}!</h2>
      <h3>Sua maneira segura e eficiente de compartilhar informações!</h3>
      <br />
      <hr />
      <br />
      <br />
      <p>Clique no botão para iniciar uma interação com um usuário.</p>
      <UserModal />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  };
}

export default connect(mapStateToProps)(Home);