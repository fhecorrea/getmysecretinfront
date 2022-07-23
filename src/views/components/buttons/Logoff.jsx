import React from "react";
import { Button } from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import { useNavigate } from "react-router";

import {currentUserLogout} from "../../../slices/currentUserSlice";

const Logoff = (props) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Deslogando " + props.user.username + " ...");
    //dispatch(currentUserAuthenticated({username, password}));
    //props.authenticate({username, password});
    dispatch(currentUserLogout());

    navigate('/', {replace: true});
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