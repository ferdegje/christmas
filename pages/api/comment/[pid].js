import auth0 from '../../../lib/auth0';
import {Comment, User} from '../../../models';

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
  const item = await Comment.findByPk(pid);
  if (!item) {
    res.status(404).end(`Object #${pid} does not exist`);
    return
  }
  if (!item.user == user.identifiant) {
    res.status(401).end(`Only user ${item.user} is allowed to delete this item. Not ${user.identifiant}`)
    return
  }
  switch(req.method) {
    case 'POST':
      for (const [key, value] of Object.entries(req.body)) {
        item[key]=value;
      }
      item.save();
      res.status(200).end(JSON.stringify(item, null, 2));
      break;
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
