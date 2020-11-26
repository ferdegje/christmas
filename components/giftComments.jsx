import React, { Component } from 'react';
import {connect} from 'react-redux';
import Head from 'next/head'

import Moment from 'react-moment';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';

import EditBeneficiary from './editBeneficiary.jsx';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';


class GiftComments extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'COMMENT_LIST_REQUESTED', gift: this.props.gift.details.id});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const message = this.getMessage.value;
    const data = {
      message,
      gift: this.props.gift.details.id,
    }
    this.props.dispatch({
      type:'COMMENT_ADD_REQUESTED',
      data});
    this.getMessage.value = '';
  }

  handleClose = (e, id) => {
    e.preventDefault();
    var r = confirm("Voulez vous vraiment supprimer ce message?");
    if (r) {
      this.props.dispatch({
        type:'COMMENT_DELETE_REQUESTED',
        id
      })
    }

  }

  render() {
    console.log(">>GiftComments.props", JSON.stringify(this.props, null, 2));


    if (this.props.gift.details) {

      const enableGifting = !this.props.gift.details.target_beneficiary.users.map(item => item.identifiant).includes(this.props.user.identifiant);
      return <>
        {this.props.comments.list && this.props.comments.list.map(item => (
          <Toast onClose={(e) => this.handleClose(e, item.id)}>
            <ToastHeader closeButton="false">
              <img
                src={item.user.picture}
                className="rounded mr-2"
                width="20px"
                alt=""
              />
              <strong className="mr-auto">{item.user.name}</strong>
              <small><Moment fromNow ago locale="fr">{item.createdAt}</Moment></small>
            </ToastHeader>
            <Toast.Body>{item.message}</Toast.Body>
          </Toast>
        ))}
        <Form onSubmit={this.handleSubmit}>

          <Form.Group controlId="formBasicMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control type="message" placeholder="Tape ton message..." ref={(input) => this.getMessage = input} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </>;
    } else {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }


   }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps)(GiftComments);
