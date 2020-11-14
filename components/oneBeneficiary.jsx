import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';

class OneBeneficiary extends Component {
  render() {
  return (
    <div>
      <h2>{this.props.item.nickname}</h2>
      <Button onClick={()=>this.props.dispatch({type:'EDIT_BENEFICIARY',id:this.props.item.id})}>Edit</Button>
      <Button onClick={()=>this.props.dispatch({type:'BENEFICIARY_DELETE_REQUESTED',id:this.props.item.id})}>Delete</Button>
    </div>
  );
 }
}
export default connect()(OneBeneficiary);
