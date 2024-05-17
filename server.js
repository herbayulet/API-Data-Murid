// panggil ini dulu
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mysqlPool = require("./config/db");

// deklarasi
const app = express();

// congig dotenv
dotenv.config();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/student", require("./routes/studentRoute"));

app.get("/test", (req, res) => {
  res.status(200).send("<h1>Node JS MySql App</h1>");
});

// port
const PORT = process.env.PORT || 8000;

// konek DB
mysqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("MySql terkoneksi".bgCyan.blue);
    // makesure jalan
    app.listen(PORT, () => {
      console.log(`Server berjalan di PORT ${PORT}`.bgMagenta.green);
    });
  })
  .catch((error) => {
    console.log(error.toString());
  });
