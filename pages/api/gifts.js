import auth0 from '../../lib/auth0';
import Gift from '../../models/Gift';
import User from '../../models/User';

export default async function me(req, res) {
  try {
    const gifts = await Gift.findAll();
    res.status(200).end(JSON.stringify(gifts, null, 2));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
