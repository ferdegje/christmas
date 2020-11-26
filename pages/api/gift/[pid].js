import auth0 from '../../../lib/auth0';
import {Beneficiary, User, Gift} from '../../../models';

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
  const item = await Gift.findByPk(pid);
  if (!item) {
    res.status(404).end(`Object #${pid} does not exist`);
    return
  }
  const allUsers = await User.findAll();
  const allBeneficiaries = await Beneficiary.findAll({
    include: User
  });

  switch(req.method) {
    case 'POST':
      for (const [key, value] of Object.entries(req.body)) {
        if (['title', 'description', 'url', 'prix', 'target_beneficiary'].includes(key)) {
          item[key]=value;
        } else {
          console.log(`Asking to set field ${key} to value ${value}. Ignored.`)
        }
      }
      item.save();
      res.status(200).end(JSON.stringify(item, null, 2));
      break;
    case 'GET':
      item.user = allUsers.filter(a => a.identifiant==item.user)[0];
      item.target_beneficiary = allBeneficiaries.filter(a => a.id==item.target_beneficiary)[0];
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
