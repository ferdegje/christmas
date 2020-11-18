import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import UserProfile from '../components/userProfile';
import GiftList from '../components/giftList';
import GiftAdd from '../components/giftAdd';

import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';

export default function Profile() {
  const { user, loading } = useFetchUser();

  return (

    <Layout user={user} loading={loading}>
    {!loading && user && (
      <>
        <GiftAdd gift=""/>
        <GiftList targetUser={user}></GiftList>
      </>
    )}
    </Layout>
  );
}
