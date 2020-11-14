import React, { Component } from 'react';
import {connect} from 'react-redux';

class EditBeneficiary extends Component {
  handleEdit = (e) => {
    e.preventDefault();
    const nickname = this.getNickname.value;

    const data = {
      nickname
    }
    this.props.dispatch({ type: 'BENEFICIARY_UPDATE_REQUESTED', id: this.props.item.id, data: data })
  }
  render() {
    return (
    <div>
      <form onSubmit={this.handleEdit}>
        <input required type="text" ref={(input) => this.getNickname = input}
        defaultValue={this.props.item.nickname} placeholder="Enter Nickname" /><br /><br />
        <button>Update</button>
      </form>
    </div>
    );
  }
}
export default connect()(EditBeneficiary);
