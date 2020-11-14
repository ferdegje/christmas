import React, { Component } from 'react';
import {connect} from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class UserProfile extends Component {
  handleEdit = (e) => {
    e.preventDefault();

    const given_name = this.getGivenName.value;
    const family_name = this.getFamilyName.value;
    const nickname = this.getNickname.value;
    const name = this.getName.value;
    const email = this.getEmail.value;
    const data = {
      given_name,
      family_name,
      nickname,
      name,
      email
    }
    console.log(data);
    this.props.dispatch({ type: 'USER_UPDATE_REQUESTED', id: this.props.user.sub, data: data })
  }
  render() {
    return (
      <div>
        {this.props.displayAlert.user.displayAlert ? (
          <Alert variant="success">
            <Alert.Heading>Changements enregistres</Alert.Heading>
            <p>
              Les changements de votre profil sont maintenant enregistres.
            </p>
          </Alert>
        ):(<div></div>)}
        <Form onSubmit={this.handleEdit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Prenom</Form.Label>
            <Form.Control type="given_name" placeholder="Prenom" defaultValue={this.props.user.given_name} ref={(input) => this.getGivenName = input}/>
            <Form.Text className="text-muted">
              Vos donnnees ne sont pas partagees.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nom de famille</Form.Label>
            <Form.Control type="family_name" placeholder="Nom de famille"  defaultValue={this.props.user.family_name} ref={(input) => this.getFamilyName = input}/>
            <Form.Text className="text-muted">
              Vos donnnees ne sont pas partagees.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Surnom</Form.Label>
            <Form.Control type="nickname" placeholder="Surnom"  defaultValue={this.props.user.nickname} ref={(input) => this.getNickname = input}/>
            <Form.Text className="text-muted">
              Vos donnnees ne sont pas partagees.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nom complet</Form.Label>
            <Form.Control type="name" placeholder="Nom complet"  defaultValue={this.props.user.name} ref={(input) => this.getName = input}/>
            <Form.Text className="text-muted">
              Vos donnnees ne sont pas partagees.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email"  defaultValue={this.props.user.email} ref={(input) => this.getEmail = input}/>
            <Form.Text className="text-muted">
              Vos donnnees ne sont pas partagees.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Mettre a jour
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        displayAlert: state
    }
}

export default connect(mapStateToProps)(UserProfile);
