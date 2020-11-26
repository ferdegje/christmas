import React, { Component } from 'react';
import {connect} from 'react-redux';
import Head from 'next/head'

import EditBeneficiary from './editBeneficiary.jsx';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import GiftAdd from './giftAdd';
import GiftComments from './giftComments';

class GiftDetail extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GIFT_DETAIL_REQUESTED', id: this.props.id});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const nickname = this.getNickname.value;
    const data = {
      editing:false,
      nickname
    }
    this.props.dispatch({
      type:'BENEFICIARY_ADD_REQUESTED',
      data});
    this.getNickname.value = '';
  }

  render() {
    console.log(">>this.props", JSON.stringify(this.props, null, 2));
    const enableGifting = !this.props.detail.target_beneficiary.users.map(item => item.identifiant).includes(this.props.user.identifiant);
    const giftAddProps = {
      'details': this.props.detail
    }
    if (this.props.detail) {
      return <>
        <Head>
          <title>({this.props.detail.target_beneficiary.nickname}) {this.props.detail.title}</title>
        </Head>
        <GiftAdd gift={giftAddProps} user={this.props.user} />
        <GiftComments gift={giftAddProps} user={this.props.user} />
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
        detail: state.gift.detail
    }
}

export default connect(mapStateToProps)(GiftDetail);
