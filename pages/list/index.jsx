import React from 'react';
import { useRouter } from 'next/router'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import UserProfile from '../../components/userProfile';
import GiftList from '../../components/giftList';
import GiftAdd from '../../components/giftAdd';

import Layout from '../../components/layout';
import { useFetchUser } from '../../lib/user';

export default function Profile() {
  const { user, loading } = useFetchUser();
  const router = useRouter()
  const beneficiary = router.query.beneficiary ? router.query.beneficiary : "";
  // console.log(">>>beneficiary", beneficiary);

  return (
    <Layout user={user} loading={loading}>
    {!loading && user && (
      <>
        <GiftAdd gift="" user={user} />
        <GiftList targetUser={user} beneficiary={beneficiary}></GiftList>
      </>
    )}
    </Layout>
  );
}
