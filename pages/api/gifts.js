import auth0 from '../../lib/auth0';
import config from '../../lib/config';
import sequelize from '../../lib/db';
import User from '../../models/User';

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();

export default async function me(req, res) {
  try {
    res.status(200).end("Bravo");
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
