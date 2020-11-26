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


  switch(req.method) {
    case 'POST':
      for (var [key, value] of Object.entries(req.body)) {
        if (['title', 'description', 'url', 'prix', 'target_beneficiary'].includes(key)) {
          // if (['target_beneficiary'].includes(key) && typeof(value) != "string") {
          //   res.status(500).end(`Field ${key} was expecting a value of type string but received ${typeof(value)} instead.`)
          //   return
          // }
          item[key]=value;
          console.log(`Asking to set field ${key} to value ${value}. Done.`)
        } else {
          console.log(`Asking to set field ${key} to value ${value}. Ignored.`)
        }
      }
      item.save();
      const theUser = await User.findByPk(item.user);
      const theBeneficiary = await Beneficiary.findByPk(item.target_beneficiary, {
        include: User
      });
      res.status(200).end(JSON.stringify({
        item,
        user: theUser,
        target_beneficiary: theBeneficiary,
      }, null, 2));
      break;
    case 'GET':
      const allUsers = await User.findAll();
      const allBeneficiaries = await Beneficiary.findAll({
        include: User
      });
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
