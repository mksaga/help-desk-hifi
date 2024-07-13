'use strict'

import express, { Express, Request, Response } from "express";
import { ListTickets } from "./repo"
import { HydrateTickets } from "./types"
import { Tables } from "../supabase_types"

var tickets = express.Router();

tickets.get('/', async function(req: Request, res: Response) {
  let data = await ListTickets()
  let hydratedTickets = await HydrateTickets(data)
  res.json(hydratedTickets);
});


module.exports = tickets;
