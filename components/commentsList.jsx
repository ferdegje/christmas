import React, { Component, useState } from 'react';
import {connect} from 'react-redux';

import Moment from 'react-moment';

import EditBeneficiary from './editBeneficiary.jsx';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';

class CommentsList extends Component {
  componentDidMount() {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(">>>this.props.comments.updateOrCreate", this.props.comments.updateOrCreate);
    const message = this.getMessage.value;
    const hidden = this.props.type=="public" ? false:true;
    const data = {
      message,
      hidden,
      gift: this.props.gift.detail.id,
    }
    console.log("About to send the event");
    console.log(data);
    this.props.dispatch({
      type:'COMMENT_ADD_REQUESTED',
      data
    });
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
    var previous = "";
    var listeDedoublonnee = [];
    for (var k in this.props.comments.list) {
      if (this.props.comments.list[k].message+this.props.comments.list[k].user.identifiant == previous) {
        console.log(`Comment ${this.props.comments.list[k].id} est en double`);
        this.props.dispatch({
          type:'COMMENT_DELETE_REQUESTED',
          id: this.props.comments.list[k].id
        })
      } else {
        listeDedoublonnee.push(this.props.comments.list[k]);
        previous = this.props.comments.list[k].message+this.props.comments.list[k].user.identifiant;
      }
    }
    // console.log(">>CommentsList.props", JSON.stringify(this.props, null, 2));
    if (listeDedoublonnee) {
      return (
        <>
          {listeDedoublonnee.filter(item => (item.hidden == true && this.props.type == "private")||(item.hidden == false && this.props.type == "public")).map(item => (
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
      </>
      );
    } else {
      return (
        <>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </>
      )
    }

   }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments,
        gift: state.gift,
        user: state.user,
    }
}

export default connect(mapStateToProps)(CommentsList);
