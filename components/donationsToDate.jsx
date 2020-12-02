import React, { Component } from 'react';
import {connect} from 'react-redux';
import Head from 'next/head'

import Moment from 'react-moment';

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

class DonationsToDate extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'DONATION_LIST_REQUESTED', user: this.props.user.identifiant});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const amount = this.getAmount.value;
    const user = this.props.user.identifiant;
    const gift = this.props.gift.detail.id;
    const data = {
      amount,
      user,
      gift
    };
    if (this.newDonation) {
      this.props.dispatch({
        type:'DONATION_ADD_REQUESTED',
        data
      });
    } else {
      this.props.dispatch({
        type:'DONATION_UPDATE_REQUESTED',
        id: this.props.donation.list.filter(x => x.user.identifiant == this.props.user.identifiant).map(x => x.id)[0],
        data,
      });
    }
    this.getAmount.value = "";
  }

  render() {
    // console.log(">>>GiftDonation.props", this.props);
    if (this.props.gift && this.props.gift.detail && this.props.user && this.props.gift.detail.target_beneficiary.users.filter(x=>x.identifiant==this.props.user.identifiant).length != 0) {
      return (<div>Les participations ne sont pas visibles pour ce cadeau, puisque le cadeau est pour vous ou une personne dont vous maintenez le profil.</div>);
    }
    if (this.props.donation.list) {


      return (
        <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ajouté</th>
              <th>Pour</th>
              <th>Cadeau</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {this.props.donation.list.filter(item=>item.user.identifiant==this.props.user.identifiant).map(item => (
              <tr>
                <td><Moment fromNow ago locale="fr">{item.updatedAt}</Moment></td>
                <td>{item.gift.target_beneficiary && item.gift.target_beneficiary.nickname}</td>
                <td>{item.gift.description}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">Cout total...</td>
              <td>{this.props.donation.list.filter(item=>item.user.identifiant==this.props.user.identifiant).map(x=>x.amount).reduce((a, b) => parseInt(a) + parseInt(b), 0)} Euros</td>
            </tr>


          </tbody>
        </Table>
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
        gift: state.gift,
        donation: state.donation,
    }
}

export default connect(mapStateToProps)(DonationsToDate);
