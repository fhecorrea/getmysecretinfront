import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import LoginButton from '../components/buttons/LoginButton';

export default function Login () {

  document.title = "Acesse sua conta! :: GetMySecret";

  return (
    <div>
      <Container fluid>
        <Card className="p-4">
          <h2>{"Acesse sua conta!"}</h2>
            <Row>
              <Col className="col-auto">
                <LoginButton />
              </Col>
            </Row>
        </Card>
      </Container>
    </div>
  );
}

/*const mapStateToProps = state => {
  return {
    user: state.currentUser
  }
};

const mapDispatchToProp = dispatch => {
  return {
    authenticate(user) {
      dispatch(authenticateUser(user));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProp)(Login);*/