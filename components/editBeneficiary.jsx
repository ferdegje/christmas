import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';

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
      <>
        <tr>

          <td>
            <input required type="text" ref={(input) => this.getNickname = input}
            defaultValue={this.props.item.nickname} placeholder="Nom" />
          </td>
          <td>
            <Button onClick={this.handleEdit}>Mettre a jour</Button>
          </td>

        </tr>
      </>
    );
  }
}
export default connect()(EditBeneficiary);
