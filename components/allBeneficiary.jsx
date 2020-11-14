import React, { Component } from 'react';
import {connect} from 'react-redux';
import OneBeneficiary from './oneBeneficiary.jsx';
import EditBeneficiary from './editBeneficiary.jsx';
import Alert from 'react-bootstrap/Alert';

class AllBeneficiary extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'BENEFICIARY_LIST_REQUESTED'});
  }
  render() {

    return (
    <div>
    <Alert variant="success">
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
      <p>
        Aww yeah, you successfully read this important alert message. This example
        text is going to run a bit longer so that you can see how spacing within an
        alert works with this kind of content.
      </p>
      <hr />
      <p className="mb-0">
        Whenever you need to, be sure to use margin utilities to keep things nice
        and tidy.
      </p>
    </Alert>
      <h1>All Beneficiaries</h1>
      {this.props.beneficiaries.map((item) => (
        <div key={item.id}>
          {item.editing ? <EditBeneficiary item={item} key={item.id} /> : <OneBeneficiary key={item.id} item={item} />}
        </div>
      ))}
    </div>
    );
   }
}

const mapStateToProps = (state) => {
    return {
        beneficiaries: state
    }
}

export default connect(mapStateToProps)(AllBeneficiary);
