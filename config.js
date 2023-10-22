module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_URI: {
    PROTOCOL: process.env.DB_PROTOCOL || 'mongodb',
    HOST: process.env.DB_HOST || '127.0.0.1',
    PORT: process.env.DB_PORT || 27017,
    NAME: process.env.DB_NAME || 'project',
    USER: process.env.DB_USER || 'username',
    PASSWORD: process.env.DB_PASS || 'password',
    get URL() { return process.env.DB_URL || `${this.PROTOCOL}://${this.HOST}:${this.PORT}/${this.NAME}`; }
  },
  SECRET_KEY: process.env.SECRET_KEY || 'test',
  SALT_ROUND: process.env.SALT_ROUND || 8,
};
