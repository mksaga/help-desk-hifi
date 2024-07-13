'use strict'

import express, { Express, Request, Response, NextFunction } from "express";
import { ListTickets, CreateTicket } from "./repo"
import { BuildTicket } from "./helpers"
import { HydrateTickets } from "./types"
import { Tables } from "../supabase_types"

var tickets = express.Router();

tickets.get('/', async function(req: Request, res: Response, next: NextFunction) {
  let data = await ListTickets()
  let hydratedTickets = await HydrateTickets(data)
  res.json(hydratedTickets);
});


tickets.post('/', async function(req: Request, res: Response, next: NextFunction) {
  console.log("in POST")
  console.log(req.body.username)
  let ticket = BuildTicket(req)
  let data = await CreateTicket(ticket)
  res.json(data);
});

module.exports = tickets;
