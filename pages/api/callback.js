import auth0 from '../../lib/auth0';
import {User, Beneficiary} from '../../models';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        console.log("Session");
        console.log(session);
        var user;
        try {
          user = await User.findByPk(session.user.sub);
        } catch(e) {
          console.log(`Error while retrieving user with pk ${session.user.sub}`)
          res.status(500).end(`Error while retrieving user with pk ${session.user.sub}`)
          return
        }

        if (user) {
          console.log("Found a user");
          console.log(user);
        } else {
          console.log("Could not find user");
          const user = {
            identifiant: session.user.sub
          }
          for (const [key, value] of Object.entries(session.user)) {
            user[key]=value;
          }
          // console.log("Creating a user with following details")
          // console.log(user)
          var u = await User.create(user);
          var a = await Beneficiary.create({
            nickname: u.nickname
          });
          a.addUser(u);
        }
        return session;
      }
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
