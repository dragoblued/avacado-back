const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const productsRotues = require("./routes/products");
const registrationRoutes = require("./routes/registration");
const changeConfig = require("./routes/config");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/addproducts", productsRotues);
app.use("/registration", registrationRoutes);
app.use("/config", changeConfig);

app.use((err, req, res, next) => {
  const { message } = err;
  res.json({ status: "ERROR", message });
});
app.listen(8080, () => console.log("Server Start"));
