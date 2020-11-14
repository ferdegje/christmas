import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import UserProfile from '../components/userProfile';
import AllBeneficiary from '../components/allBeneficiary';

import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';

export default function Profile() {
  const { user, loading } = useFetchUser();

  return (

    <Layout user={user} loading={loading}>
    {!loading && user && (
      <Row>
        <Col>
          <Card>
            <Card.Header>Profil - {user.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                <UserProfile user={user}/>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
        <Card>
          <Card.Header>Profils dependants</Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">Ajouter ici les personnes que vous voudriez rajouter a votre compte (par exemple, enfants).</Card.Subtitle>
            <Card.Text>
              <AllBeneficiary />
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    )}
    </Layout>
  );
}
