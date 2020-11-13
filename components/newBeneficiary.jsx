import React, { Component } from 'react';
import {connect} from 'react-redux';

class NewBeneficiary extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const nickname = this.getNickname.value;
    const data = {
      id: new Date(),
      editing:false,
      nickname
    }
    this.props.dispatch({
      type:'ADD_BENEFICIARY',
      data});
    this.getNickname.value = '';
  }

  render() {
    return (
    <div>
      <h1>Create Beneficiary</h1>
      <form onSubmit={this.handleSubmit}>
       <input required type="text" placeholder="Enter Nickname" ref={(input)=>this.getNickname = input}/><br /><br />
       <button>Post</button>
      </form>
    </div>
    );
  }
}
export default connect()(NewBeneficiary);
