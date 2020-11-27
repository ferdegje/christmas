import React, { Component } from 'react';
import {connect} from 'react-redux';
import Head from 'next/head'

import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';
import EditBeneficiary from './editBeneficiary.jsx';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import TabContent from 'react-bootstrap/TabContent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import CommentsList from './commentsList';

class GiftComments extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'COMMENT_LIST_REQUESTED', gift: this.props.gift.details.id});
  }

  setKey = (k) => {
    this.key = (this.key == "public") ? "private" : "public";
  }

  render() {
    // console.log(">>GiftComments.props", JSON.stringify(this.props, null, 2));

    if (this.props.gift.details) {

      const enableGifting = !this.props.gift.details.target_beneficiary.users.map(item => item.identifiant).includes(this.props.user.identifiant);
      return (
        <>
          <Tabs
            id="controlled-tab-example"
            activeKey={this.key}
            onSelect={(k) => this.setKey(k)}
          >
            <Tab eventKey="public" title="Visible a tous">
              <br />
              <CommentsList comments={this.props.comments} user={this.props.user} gift={this.props.gift} type="public" />
            </Tab>
            <Tab eventKey="private" title="Secrets">
              <br />
              La conversation ci dessous est invisible a {this.props.gift.details.target_beneficiary.users.map(k => k.name).join(",")}.
              <CommentsList comments={this.props.comments} user={this.props.user} gift={this.props.gift} type="private" />
            </Tab>
          </Tabs>
        </>
      );
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
