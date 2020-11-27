import React from 'react';

import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DonationsToDate from '../components/donationsToDate';
import BeneficiariesToDate from '../components/beneficiariesToDate';

export default function Home() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading}>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <Button href="/api/login">Se connecter</Button>
      )}

      {user && (
        <>
          <h4>Bonjour {user.name}</h4>
          <Row>
            <Col>
              Vos contributions aux cadeaux sont les suivantes:
              <DonationsToDate user={user}/>
            </Col>
          </Row>
          <Row>
            <Col>
              La meme vue, mais ce coup ci par personne:
              <BeneficiariesToDate user={user}/>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
}
