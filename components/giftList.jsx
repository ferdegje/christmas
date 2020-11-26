import React, { Component } from 'react';
import {connect} from 'react-redux';

import EditBeneficiary from './editBeneficiary.jsx';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';

class GiftList extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GIFT_LIST_REQUESTED', targetUser: this.props.targetUser});
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
    console.log(">>this.props.gift", JSON.stringify(this.props.gift, null, 2));
    if (this.props.gift.list) {
      return (
        <CardColumns>
          {this.props.gift.list.map((item) => (
              <Card>
                {item && item.picture ? (
                    <Card.Img variant="top" src={item.picture} />
                ) : (<></>)}
                <Card.Body>
                  <Card.Title>
                    {item.title}&nbsp;
                    {(item.prix) ? (
                        <Badge variant="secondary">{item.prix}€</Badge>
                    ) : (
                      <></>
                    )}

                  </Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button variant="primary" href={'/list/' + item.id}>>> Details</Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {item.target_beneficiary ? (
                    <>Pour {item.target_beneficiary.nickname}</>
                  ) : (
                    <></>
                  )}

                  {(item.target_beneficiary && item.target_beneficiary.user && item.user.identifiant==item.target_beneficiary.user) ? (
                    <></>
                  ) : (
                    <footer className="blockquote-footer">
                      <small className="text-muted">
                        Commande par <cite title="Source Title">{item.user.name}</cite>
                      </small>
                    </footer>

                  )}
                </Card.Footer>
              </Card>
            ))}
        </CardColumns>
      );
    } else {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

   }
}

const mapStateToProps = (state) => {
    return {
        gift: state.gift
    }
}

export default connect(mapStateToProps)(GiftList);
