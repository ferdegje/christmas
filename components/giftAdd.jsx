import React, { Component } from 'react';
import {connect} from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';


class GiftAdd extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'BENEFICIARY_LIST_REQUESTED'});
  }

  handleDelete = (e) => {
    e.preventDefault();
    if (confirm("Voulez vous vraiment supprimer ce cadeau?")) {
        this.props.dispatch({ type: 'GIFT_DELETE_REQUESTED', id: this.props.gift.detail.id })
    }

  }

  handleEdit = (e) => {
    e.preventDefault();

    const description = this.getDescription.value;
    const title = this.getTitle.value;
    const url = this.getUrl.value;
    const prix = parseFloat(this.getPrix.value);
    const target_beneficiary = this.getTargetBeneficiary.value;
    const confidentiel = this.props.gift.confidentiel;
    const data = {
      description,
      title,
      url,
      prix,
      target_beneficiary,
      confidentiel,
    }
    console.log(data);
    if (this.props.gift && this.props.gift.detail && this.props.gift.detail.id) {
      this.props.dispatch({ type: 'GIFT_UPDATE_REQUESTED', id: this.props.gift.detail.id, data: data })
    } else {
      this.props.dispatch({ type: 'GIFT_ADD_REQUESTED', data: data })
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

  handleConfidentielClick = (e) => {
    var confidentiel = !this.props.gift.confidentiel;
    var data = {
      confidentiel
    }
    this.props.dispatch({ type: 'GIFT_PAYLOAD', data});
  }

  handleSelectionOfPour = (e) => {
    e.preventDefault();
    this.displayOptionConfidentielle = this.props.beneficiary.filter(x=>x.id==e.target.value)[0].users.filter(x=>x.identifiant==this.props.user.identifiant).length == 0;
    this.props.dispatch({ type: 'GIFT_UPDATE_REQUESTED'});
  }

  render() {
    //console.log(">>>this.displayOptionConfidentielle", this.displayOptionConfidentielle)

    // console.log(">>GiftAdd.props", JSON.stringify(this.props, null, 2));
    const canEdit = !this.props.gift.detail || (this.props.gift.detail && (this.props.gift.detail.user.identifiant == this.props.user.identifiant || this.props.gift.detail.target_beneficiary.users.map(item => item.identifiant).includes(this.props.user.identifiant)));
    const detail = this.props.gift.detail ? this.props.gift.detail : {
      'url': "",
      'title': "",
      'description': "",
      'prix': "",
      'target_beneficiary': {
        'id': 0
      }
    };

    return (
      <>
      <Accordion defaultActiveKey="1">
  <Card>
    <Card.Header>
      {canEdit ? (
        detail.id ? (
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            {this.props.gift.detail.title} - <b>Mise a jour</b>
          </Accordion.Toggle>
        ) : (
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Ajouter un cadeau
          </Accordion.Toggle>
        )
      ) : (
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          {this.props.gift.detail.title} - Détails du cadeau
        </Accordion.Toggle>
      )}

    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
        {this.props.gift.updateOrCreate == "success" ? (
          <Alert variant="success">
            <Alert.Heading>Changements enregistres</Alert.Heading>
            <p>
              Les changements sont maintenant enregistres.
            </p>
          </Alert>
        ):(<></>)}
        <Form onSubmit={this.handleEdit}>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>URL</Form.Label>
            {canEdit ? (
              (this.props.gift.url && this.props.gift.url.url) ? (
                <Form.Control type="url" placeholder="Adresse web"  readOnly={!canEdit} defaultValue={this.props.gift.url.url} ref={(input) => this.getUrl = input} onChange={(e) => this.handleUrl(e, this)}/>
              ) : (
                <Form.Control type="url" placeholder="Adresse web"  readOnly={!canEdit} defaultValue={detail.url} ref={(input) => this.getUrl = input} onChange={(e) => this.handleUrl(e, this)}/>
              )
            ) : (
              <>:{" "}<a href={detail.url} target="_blank">{detail.url}</a></>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Titre</Form.Label>
            {(this.props.gift.url && this.props.gift.url.title) ? (
              <Form.Control type="titre" placeholder="Titre"  readOnly={!canEdit} defaultValue={this.props.gift.url.title} ref={(input) => this.getTitle = input}/>
            ) : (
              <Form.Control type="titre" placeholder="Titre"  readOnly={!canEdit} defaultValue={detail.title} ref={(input) => this.getTitle = input}/>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            {(this.props.gift.url && this.props.gift.url.description) ? (
              <Form.Control as="textarea" rows={3} type="description"  readOnly={!canEdit} placeholder="Description" defaultValue={this.props.gift.url.description} ref={(input) => this.getDescription = input}/>
            ): (
              <Form.Control as="textarea" rows={3} type="description"  readOnly={!canEdit} placeholder="Description" defaultValue={detail.description} ref={(input) => this.getDescription = input}/>
            )}
          </Form.Group>



          <Form.Group controlId="formBasicEmail">
            <Form.Label>Prix (en Euros)</Form.Label>
            {canEdit ? (
              <Form.Control type="prix" placeholder="Prix" readOnly={!canEdit} defaultValue={detail.prix} ref={(input) => this.getPrix = input}/>
            ) : (
              <>:{" "}{detail.prix}</>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Pour</Form.Label>
            {detail.target_beneficiary.id == 0 ? (
              <Form.Control as="select" type="name" placeholder="Pour" readOnly={!canEdit} ref={(input) => this.getTargetBeneficiary = input} onChange={this.handleSelectionOfPour}>
              {this.props.beneficiary.map((value, index) => <option value={value.id}>{value.nickname}</option>)}
              </Form.Control>
            ) : (
              <>:{" "}{detail.target_beneficiary.nickname}</>
            )}

          </Form.Group>
          {this.displayOptionConfidentielle ? (
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="switch" label="Garder ce cadeau confidentiel (ne sera pas visible pour le beneficiaire)." onClick={this.handleConfidentielClick} value={this.props.gift.confidentiel} />
            </Form.Group>
          ) : (
            <></>
          )}

            {canEdit ? (
              detail.id ? (
                <>
                  <Button variant="primary" type="submit">
                    Mettre a jour
                  </Button>{' '}
                  <Button variant="danger" onClick={this.handleDelete}>
                    Supprimer
                  </Button>
                </>
            ) : (
              <Button variant="primary" type="submit">
                Ajouter
              </Button>
            )
          ) : (
            <></>
          )}

        </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    </Accordion>
    <br />
    </>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        gift: state.gift,
        beneficiary: state.beneficiary,
    }
}

export default connect(mapStateToProps)(GiftAdd);
