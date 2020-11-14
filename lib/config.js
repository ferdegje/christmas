if (typeof window === 'undefined') {
  /**
   * Settings exposed to the server.
   */
  module.exports = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    REDIRECT_URI: process.env.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME,
    DB_PWD: process.env.DB_PWD,
    DB_IP: process.env.DB_IP,
    DB_USER: process.env.DB_USER,
    DB_PWD: process.env.DB_PWD,
    DB_NAME: process.env.DB_NAME,
    SEQUELIZE_SYNC: true,
    SEQUELIZE_SYNC_FORCE: false
  };
  console.log(module.exports);
} else {
  /**
   * Settings exposed to the client.
   */
  module.exports = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    REDIRECT_URI: process.env.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI
  };
}
