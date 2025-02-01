import AppDataSource from "./data-source";
import app from "./app";

const port = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });
