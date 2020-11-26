import React, { Component } from 'react';
import {connect} from 'react-redux';

import EditBeneficiary from './editBeneficiary.jsx';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class AllBeneficiary extends Component {
  componentDidMount() {
    const data = {'where': 'mine'};
    this.props.dispatch({type: 'BENEFICIARY_LIST_REQUESTED', data});
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
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Editer</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
        {this.props.beneficiaries.beneficiary.map((item) => (
          <>
            {item.editing ? (
              <EditBeneficiary item={item} />
            ) : (
              <tr>
                <td>
                  {item.nickname}
                </td>
                <td>
                  <Button onClick={()=>this.props.dispatch({type:'EDIT_BENEFICIARY',id:item.id})}>Editer</Button>
                </td>
                <td>
                  <Button onClick={()=>this.props.dispatch({type:'BENEFICIARY_DELETE_REQUESTED',id:item.id})}>Supprimer</Button>
                </td>
              </tr>
            )}
          </>
        ))}
          <tr>
            <td colspan="2">
              <input required type="text" placeholder="Enter Nickname" ref={(input)=>this.getNickname = input}/>
            </td>
            <td>
              <Button onClick={this.handleSubmit}>Creer</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
   }
}

const mapStateToProps = (state) => {
    return {
        beneficiaries: state
    }
}

export default connect(mapStateToProps)(AllBeneficiary);
