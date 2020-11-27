import auth0 from '../../../lib/auth0';
import {Beneficiary, User, Gift, Donation} from '../../../models';

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
        const donations = await Donation.findAll({
          order: [[orderBy, 'DESC']],
          where: {
            gift: req.query.gift
          }
        });
        const allUsers = await User.findAll();
        const allGifts = await Gift.findAll();
        const resultValues = donations
          .map(item => {
            item.user = allUsers.filter(a => a.identifiant==item.user)[0];
            // console.log(">>>usero", JSON.stringify(usero, null, 2))
            return item;
          })
          .map(item => {
            item.gift = allGifts.filter(a => a.id==item.gift)[0];
            // console.log(">>>usero", JSON.stringify(usero, null, 2))
            return item;
          });
        res.status(200).end(JSON.stringify(resultValues, null, 2));
      } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
      }
      break;
    case 'POST':
      const objPayload = {...req.body, user: user.identifiant}
      console.log(objPayload);
      const a = await Donation.create(objPayload);
      let answer = {
        ...a.toJSON()
      }
      res.status(200).json(answer)
      break;
    default:
      res.status(405).end(req.method + " is an unsupported method.");
  }
}
