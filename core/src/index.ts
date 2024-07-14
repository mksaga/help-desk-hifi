import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { BuildTicket } from "./tickets/helpers"

dotenv.config();

const app = express();
const cors = require("cors")
const port = process.env.PORT || 3000;

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://help-desk-hifi.vercel.app"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/tickets', require('./tickets/router'));

app.get('/', async function(req: Request, res: Response) {
  const message = `
  Welcome to the backend for mksaga's help desk.

  Available endpoints:
  GET /tickets
  POST /tickets

  GET /ticket/:id
  PUT /ticket/:id
  `
  res.json(message);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
