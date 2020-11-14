import auth0 from '../../lib/auth0';
import User from '../../models/User';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        console.log(session);

        const user = await User.findByPk(session.user.sub);
        if (!user) {
          const user = {
            identifiant: session.user.sub
          }
          for (const [key, value] of Object.entries(session.user)) {
            user[key]=value;
          }
          console.log("Creating a user with following details")
          console.log(user)
          await User.create(user);
        }
        return session;
      }
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
