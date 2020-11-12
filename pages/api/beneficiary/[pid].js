import auth0 from '../../../lib/auth0';
import Beneficiary from '../../../models/Beneficiary';
import User from '../../../models/User';

export default async function me(req, res) {
  const {
    query: { pid },
  } = req
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
  const item = await Beneficiary.findByPk(pid, {
    include: User
  });
  if (!item) {
    res.status(404).end(`Object #${pid} does not exist`);
    return
  }
  switch(req.method) {
    case 'GET':
      res.status(200).end(JSON.stringify(item, null, 2));
      break;
    case 'DELETE':
      await item.destroy();
      res.status(200).end("Deleted")
      break;
    default:
      res.status(405).end(req.method + " is an unsupported method.");
  }
}
