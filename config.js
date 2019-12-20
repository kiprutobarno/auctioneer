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
    config.DATABASE_URL =
      "postgres://admin:admin123@localhost:5432/auctioneer_test";
    break;
  default:
    config.PORT = process.env.PORT || 4000;
    config.DATABASE_URL = process.env.DATABASE_URL;
    break;
}

export default config;
