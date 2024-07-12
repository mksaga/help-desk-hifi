'use strict'

import express, { Express, Request, Response } from "express";
import { ListTickets } from "./repo"

var tickets = express.Router();

tickets.get('/', async function(req: Request, res: Response) {
  let data = await ListTickets()
  res.json(data);
});


module.exports = tickets;
