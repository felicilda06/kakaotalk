import express, { Application } from "express";
import { config } from "./config/config";
import bodyParser from "body-parser";
import { mainRoute, AccountRoute } from "./routes";
import { Socket } from "./socket/socket";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";

const { PORT } = process.env;
const { conn_string, configurations } = config;

const app: Application = express();
const server = http.createServer(app);
const port: string | number | undefined = PORT ?? 8000;

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);

  mongoose //@ts-ignore
    .connect(conn_string, configurations)
    .then(() => console.log(`Connected to MongoDb`))
    .catch((err) => console.log(`Error`, err));

  Socket(server);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mainRoute);
app.use(AccountRoute);
