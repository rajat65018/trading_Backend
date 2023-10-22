module.exports = {
  PORT: process.env.PORT,
  DATABASE_URI: process.env.DATABASE_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  SALT_ROUND: process.env.SALT_ROUND,
  SMTP_MAIL:process.env.SMTP_MAIL,
  SMTP_PASSWORD:process.env.SMTP_PASSWORD
};
