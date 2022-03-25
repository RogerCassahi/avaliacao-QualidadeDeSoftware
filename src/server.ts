import Database from "./core/infra/data/connections/database";
import App from "./core/presentation/app";

new Database()
  .openConnection()
  .then(() => {
    const app = new App();
    app.init();
    app.start(process.env.PORT || "3333");
  })
  .catch((error) => {
    console.log(error);
  });