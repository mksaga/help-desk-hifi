import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { BuildTicket } from "./tickets/helpers"

dotenv.config();

const app = express();
const cors = require("cors")
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/tickets', require('./tickets/router'));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
