import "dotenv/config";
const config = {
  api: {
    prefix: `^/api/v[1-9]`,
    version: [1]
  }
};

switch (process.env.NODE_ENV) {
  case "production":
    config.PORT = process.env.PORT;
    config.DATABASE_URL = process.env.DATABASE_URL;
    break;
  case "development":
    config.PORT = process.env.PORT;
    config.DATABASE_URL = process.env.DATABASE_URL;
    break;
  case "test":
    config.PORT = process.env.PORT;
    config.DATABASE_URL = process.env.TEST_DATABASE_URL;
    break;
  default:
    config.PORT = process.env.PORT || 4000;
    config.DATABASE_URL = process.env.DATABASE_URL;
    break;
}

export default config;
