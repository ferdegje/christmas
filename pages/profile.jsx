import React from 'react';

import Card from 'react-bootstrap/Card';

import UserProfile from '../components/userProfile';
import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';

export default function Profile() {
  const { user, loading } = useFetchUser();

  return (

    <Layout user={user} loading={loading}>
    {!loading && user && (
      <Card>
        <Card.Header>Profil - {user.name}</Card.Header>
        <Card.Body>
          <Card.Text>
            <UserProfile user={user}/>
          </Card.Text>
        </Card.Body>
      </Card>
    )}
    </Layout>
  );
}
