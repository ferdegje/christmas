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
    this.props.dispatch({type: 'COMMENT_LIST_REQUESTED', gift: this.props.gift.detail.id});
  }

  setKey = (k) => {
    this.key = (this.key == "public") ? "private" : "public";
  }

  render() {
    console.log(">>GiftComments.props", this.props);

    if (this.props.gift.detail) {
      const enableGifting = !this.props.gift.detail.target_beneficiary.users.map(item => item.identifiant).includes(this.props.user.identifiant);
      return (
        <>
          <Tabs
            id="controlled-tab-example"
            activeKey={this.key}
            onSelect={(k) => this.setKey(k)}
          >
            {this.props.gift.detail.confidentiel ? (
              <></>
            ) : (
              <Tab eventKey="public" title="Visible a tous">
                <br />
                <CommentsList type="public" />
              </Tab>
            )}

            <Tab eventKey="private" title="Secrets">
              {(this.props.gift && this.props.gift.detail && this.props.user && this.props.gift.detail.target_beneficiary.users.filter(x=>x.identifiant==this.props.user.identifiant).length != 0) ? (
                <>Cette conversation ne vous est pas accessible car le cadeau est pour vous ou pour un profil que vous controlez.</>
              ) : (
                <>
                  <br />
                  La conversation ci dessous est invisible a {this.props.gift.detail.target_beneficiary.users.map(k => k.name).join(",")}.
                  <CommentsList type="private" />
                </>
              )}

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
        comments: state.comments,
        gift: state.gift
    }
}

export default connect(mapStateToProps)(GiftComments);
