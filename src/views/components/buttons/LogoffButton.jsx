import React from "react";
import { Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { currentUserLogout } from "../../../slices/currentUserSlice";

import { useMsal } from "@azure/msal-react";

const Logoff = (props) => {
  
  const dispatch = useDispatch();
  
  const { instance } = useMsal();

  const handleClick = () => {
    
    // Desloga o usuário da aplicação
    console.log("Deslogando " + props.user.username + " ...");    
    sessionStorage.removeItem("current_user");
    dispatch(currentUserLogout());
    
    // Permite ao usuário deslogar do serviço da microsoft
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/"
    });

  };

  return (
    <Button
      type="button"
      className="btn btn-danger btn-lg"
      onClick={handleClick}
    >SAIR</Button>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  };
}

export default connect(mapStateToProps)(Logoff);