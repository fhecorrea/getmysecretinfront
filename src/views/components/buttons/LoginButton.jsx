import React from 'react';

import { useMsal } from '@azure/msal-react';
import { Button } from 'react-bootstrap';
import { loginRequest } from '../../../authConfig';
import { useDispatch } from 'react-redux';
import { currentUserAuthenticated } from '../../../slices/currentUserSlice';
import { encode as base64_encode } from 'base-64';

const Login = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch();

  const handleClick = () => {
   
    instance.loginPopup(loginRequest)
      .then(d => {
        console.log(d.account, d.account.name, d.account, d.idTokenClaims, d.idTokenClaims.name);
        const user = {
          id: d.account.homeAccountId,
          name: d.account.name,
          username: d.account.username,
          accessToken: d.accessToken
        };
        
        // Grava as informações tanto em sessão quanto no 
        // redux storage, para a situação do usuário atualizar
        // a página no botão 'refresh'do browser.
        sessionStorage.setItem("current_user", base64_encode(JSON.stringify(user)));
        dispatch(currentUserAuthenticated(user));
      })
      .catch(e => {
        console.log(e.errorCode);
        //if (e.errorCode === "user_cancelled")
          //navigate('/', {replace: true});
        console.log(e);
      });
  };

  return (
    <Button
      className='btn btn-lg'
      variant="success"
      onClick={handleClick}
    >
      Entrar com conta da organização
    </Button>
  );
};

export default Login;