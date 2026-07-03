import app from "./app";
import sequelize from "./config/db";

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(async () => {
    console.log(" Database Connected");

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(` Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
