import React from 'react';

import Layout from '../components/layout';
import NewBeneficiary from '../components/newBeneficiary';
import AllBeneficiary from '../components/AllBeneficiary';
import { useFetchUser } from '../lib/user';


export default function Beneficiaries() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading}>
      <h1>Beneficiaries</h1>
      <p>
        This is the about page, navigating between this page and <i>Home</i> is always pretty fast. However, when you
        navigate to the <i>Profile</i> page it takes more time because it uses SSR to fetch the user first;
      </p>
      <NewBeneficiary />
      <AllBeneficiary />
    </Layout>
  );
}