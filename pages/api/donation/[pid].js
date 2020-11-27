import auth0 from '../../../lib/auth0';
import {Beneficiary, User, Gift, Donation} from '../../../models';

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
  const item = await Donation.findByPk(pid);
  if (!item) {
    res.status(404).end(`Object #${pid} does not exist`);
    return
  }
  if (item.user != user.identifiant) {
    res.status(401).end(`Object #${pid} does not belong to user ${user.identifiant}.`);
    return
  }

  switch(req.method) {
    case 'POST':
      for (var [key, value] of Object.entries(req.body)) {
        if (['gift', 'user', 'amount'].includes(key)) {
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
      const theGift = await Gift.findByPk(item.gift);
      res.status(200).end(JSON.stringify({
        item,
        user: theUser,
        gift: theGift,
      }, null, 2));
      break;
    case 'GET':
      const allUsers = await User.findAll();
      const allGifts = await Gift.findAll();
      var u = allUsers.filter(a => a.identifiant==item.user)[0];
      var g = allGifts.filter(a => a.id==item.target_beneficiary)[0];
      res.status(200).end(JSON.stringify({item, gift: g, user: u}, null, 2));
      break;
    case 'DELETE':
      await item.destroy();
      res.status(200).end("Deleted")
      break;
    default:
      res.status(405).end(req.method + " is an unsupported method.");
  }
}
