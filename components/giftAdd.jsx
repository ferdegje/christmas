import React, { Component } from 'react';
import {connect} from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';



class GiftAdd extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'BENEFICIARY_LIST_REQUESTED'});
  }

  handleEdit = (e) => {
    e.preventDefault();

    const description = this.getDescription.value;
    const title = this.getTitle.value;
    const url = this.getUrl.value;
    const prix = parseFloat(this.getPrix.value);
    const target_beneficiary = this.getTargetBeneficiary.value;
    const data = {
      description,
      title,
      url,
      prix,
      target_beneficiary
    }
    console.log(data);
    if (!this.props.gift.id) {
      this.props.dispatch({ type: 'GIFT_ADD_REQUESTED', data: data })
    } else {
      this.props.dispatch({ type: 'GIFT_UPDATE_REQUESTED', id: this.props.gift.id, data: data })
    }
  }

  async handleUrl(e, ctx) {
    e.preventDefault();
    const data = {
      url: e.target.value
    }
    if (e.target.value !== '') {
        ctx.props.dispatch({ type: 'GIFT_URLDETAILS_REQUESTED', data: data })
    }
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
            <Form.Label>URL</Form.Label>
            <Form.Control type="url" placeholder="Adresse web"  defaultValue={this.props.gift.url} ref={(input) => this.getUrl = input} onChange={(e) => this.handleUrl(e, this)}/>
            <Form.Text className="text-muted">
              Vos donnnees ne sont pas partagees.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Titre</Form.Label>
            <Form.Control type="titre" placeholder="Titre" defaultValue={this.props.gift.title} ref={(input) => this.getTitle = input}/>
            <Form.Text className="text-muted">
              Vos donnnees ne sont pas partagees.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} type="description" placeholder="Description" defaultValue={this.props.gift.description} ref={(input) => this.getDescription = input}/>

            <Form.Text className="text-muted">
              Vos donnnees ne sont pas partagees.
            </Form.Text>
          </Form.Group>



          <Form.Group controlId="formBasicEmail">
            <Form.Label>Prix (en Euros)</Form.Label>
            <Form.Control type="nickname" placeholder="Prix"  defaultValue={this.props.gift.prix} ref={(input) => this.getPrix = input}/>
            <Form.Text className="text-muted">
              Vos donnnees ne sont pas partagees.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Pour</Form.Label>
            <Form.Control as="select" type="name" placeholder="Pour"  defaultValue={this.props.gift.target_beneficiary} ref={(input) => this.getTargetBeneficiary = input}>
            {this.props.beneficiary.map((value, index) => {
              return <option value={value.id}>{value.nickname}</option>
            })}
            </Form.Control>
            <Form.Text className="text-muted">
              Vos donnnees ne sont pas partagees.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        displayAlert: state,
        gift: state.gift,
        beneficiary: state.beneficiary,
    }
}

export default connect(mapStateToProps)(GiftAdd);
