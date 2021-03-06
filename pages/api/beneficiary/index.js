import auth0 from '../../../lib/auth0';
import {Beneficiary, User} from '../../../models';

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
  switch(req.method) {
    case 'GET':
      const orderBy = req.query.order || "id";
      try {
        const gifts = await Beneficiary.findAll({
          include: User,
          order: [[orderBy, 'DESC']],
        });
        var results;
        console.log(">>req.query.where", req.query.where)
        switch(req.query.where) {
          case "mine":
            results = gifts.filter(item => item.users.map(k => k.identifiant).includes(user.identifiant));
            break
          default:
            results = gifts;
        }
        res.status(200).end(JSON.stringify(results), null, 2);
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
