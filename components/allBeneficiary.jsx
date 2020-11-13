import React, { Component } from 'react';
import {connect} from 'react-redux';
import OneBeneficiary from './oneBeneficiary.jsx';
import EditBeneficiary from './editBeneficiary.jsx';

class AllBeneficiary extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'BENEFICIARY_LIST_REQUESTED'});
  }
  render() {

    return (
    <div>
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
