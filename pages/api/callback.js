import auth0 from '../../lib/auth0';
import User from '../../models/User';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        console.log(session);
        try {
          let user = await User.findByPk(session.user.sub);
        } catch(err) {
          await User.create({
            identifiant: session.user.sub,
            given_name: session.user.given_name,
            family_name: session.user.family_name,
            locale: session.user.locale
          });
        }
        return session;
      }
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
