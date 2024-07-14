import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { BuildTicket } from "./tickets/helpers"

dotenv.config();

const app = express();
// const formData = require("express-form-data");
// const os = require("os");
const port = process.env.PORT || 3000;
// const multer = require('multer');
// var upload = multer();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + za TypeScript Server');
});

app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/tickets', require('./tickets/router'));

app.post('/create-ticket', async function(req: Request, res: Response) {
  console.log("CreateTicket BODY: ", req.body)
  let ticket = BuildTicket(req)
  res.json(ticket)
  // let data = await CreateTicket(ticket);
  // EmailUser("admin@ticketdash.co", ticket);
  // res.json(data);
});



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
