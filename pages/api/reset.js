import auth0 from '../../lib/auth0';
import reset from '../../models';

export default async function me(req, res) {
  try {
    reset()
    res.status(200).end("Reset");
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
