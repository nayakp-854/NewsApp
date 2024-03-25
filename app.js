import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

//components
import Connection from "./database/db.js";
import Route from "./routes/route.js";
import DefaultData from "./default.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use("/", Route);

// const username = process.env.DB_USERNAME;
const url = process.env.MONGODB_URL;
const PORT = process.env.PORT || 8000;

Connection(url);

// serving the client
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);

DefaultData();
