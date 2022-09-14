import express from "express";
import homeRouter from "./router/homeRouter.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("./public"));

app.use(express.urlencoded({ extended: false }));
app.use("/", homeRouter);

app.listen(5000, () => {
  console.log(`Listening at port 5000...`);
});
