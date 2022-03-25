require("dotenv").config();

let config = {};

const enviroment = process.env.NODE_ENV?.toLowerCase()
const rootDir = enviroment === "production" ? "dist" : "src";
if (enviroment === "test") {
  config = {
    type: "sqlite",
    database: "./testedb.sql",
    entities: [`${rootDir}/core/infra/data/database/entities/**/*`],
    migrations: [`${rootDir}/core/infra/data/database/migrations/**/*`],
  };
} else {
  config = {
    type: "postgres",
    //url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: [`${rootDir}/core/infra/data/database/entities/**/*`],
    migrations: [`${rootDir}/core/infra/data/database/migrations/**/*`],
    cli: {
      entitiesDir: "src/core/infra/data/database/entities",
      migrationsDir: "src/core/infra/data/database/migrations",
    },
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
}

module.exports = config;
