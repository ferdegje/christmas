import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: 'dev-uy4gfovj.eu.auth0.com',
  clientId: '0jNiVBJC67337168Gx5sq6ixiedwSzQE',
  clientSecret: process.env.AUTH0_SECRET,
  scope: 'openid profile',
  redirectUri: 'http://localhost:3000/api/callback',
  postLogoutRedirectUri: 'http://localhost:3000/',
  session: {
    cookieSecret: '45a7e664d7ef4115234a2900daef63a71251ef585068b7e9e5ce7ea5c9de35ae',
    cookieLifetime: 60 * 60 * 8
  }
});
