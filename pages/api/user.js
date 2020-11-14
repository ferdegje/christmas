import auth0 from '../../lib/auth0';
import User from '../../models/User';

export default async function me(req, res) {
  const session = await auth0.getSession(req);
  if (!session || session.user.sub === undefined) {
    res.status(401).end("Unauthorized");
    return;
  }
  let user;
  try {
    user = await User.findByPk(session.user.sub);
  } catch(error) {
    if (error.message && error.status) {
        res.status(error.status || 500).end(error.message);
    } else {
        res.status(500).end("Exception thrown during retrieval of user with no message")
    }
    return
  }
  if (!user) {
    res.status(401).end(`Could not find a user with PK ${session.user.sub}`)
    return
  }
  switch(req.method) {
    case 'GET':
      try {
        res.status(200).end(JSON.stringify(user, null, 2));
      } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
      }
      break;
    case 'POST':
      console.log(req.body)
      for (const [key, value] of Object.entries(req.body)) {
        user[key]=value;
      }
      user.save();
      res.status(200).json(JSON.stringify(user, null, 2))
      break;
    default:
      res.status(405).end(req.method + " is an unsupported method.");
  }
}
