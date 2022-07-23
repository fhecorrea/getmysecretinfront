import React from 'react';
import {connect} from 'react-redux';
import UserModal from '../components/misc/UsersModal';

const Home = (props) => {

  document.title = "Dashboard sem gráficos :: GetMySecret";

  return (
    <div>
      <h2>Bem vindo ao Get My Secret, {props.user.username}!</h2>
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