import React, { Component } from 'react';
import {connect} from 'react-redux';

class OneBeneficiary extends Component {
  render() {
  return (
    <div>
      <h2>{this.props.item.nickname}</h2>
      <button onClick={()=>this.props.dispatch({type:'EDIT_BENEFICIARY',id:this.props.item.id})}>Edit</button>
      <button onClick={()=>this.props.dispatch({type:'DELETE_BENEFICIARY',id:this.props.item.id})}>Delete</button>
    </div>
  );
 }
}
export default connect()(OneBeneficiary);
