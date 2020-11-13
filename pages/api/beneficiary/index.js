import auth0 from '../../../lib/auth0';
import Beneficiary from '../../../models/Beneficiary';
import User from '../../../models/User';

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
    res.status(error.status || 500).end(error.message);
    return
  }
  switch(req.method) {
    case 'GET':
      console.log(session);
      try {
        const gifts = await Beneficiary.findAll({
          include: User
        });
        res.status(200).end(JSON.stringify(gifts, null, 2));
      } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
      }
      break;
    case 'POST':
      const a = await Beneficiary.create(req.body);
      a.addUser(user);
      let answer = {
        ...a.toJSON(),
        user: user.toJSON()
      }
      res.status(200).json(answer)
      break;
    default:
      res.status(405).end(req.method + " is an unsupported method.");
  }
}