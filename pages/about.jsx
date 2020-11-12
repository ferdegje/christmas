import React from 'react';

import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';


export default function About() {
  const { user, loading } = useFetchUser();
  console.log("me?");
  console.log(config.DB_PWD);
  return (
    <Layout user={user} loading={loading}>
      <h1>About</h1>
      <p>
        This is the about page, navigating between this page and <i>Home</i> is always pretty fast. However, when you
        navigate to the <i>Profile</i> page it takes more time because it uses SSR to fetch the user first;
      </p>
    </Layout>
  );
}
