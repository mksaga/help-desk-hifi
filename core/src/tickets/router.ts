'use strict'

import express, { Request, Response, NextFunction } from "express";
import { ReadTicket, ListTickets, CreateTicket, UpdateTicket } from "./repo"
import { BuildTicket, BuildNewTicket } from "./helpers"
import { HydrateTickets } from "./types"
import { EmailUser } from "../email"

var tickets = express.Router();

tickets.get('/', async function(req: Request, res: Response, next: NextFunction) {
  let data = await ListTickets()
  let hydratedTickets = await HydrateTickets(data)
  res.json(hydratedTickets);
});

tickets.get('/:id', async function(req: Request, res: Response, next: NextFunction) {
  let data = await ReadTicket(req.params.id)
  res.json(data)
})


tickets.post('/', async function(req: Request, res: Response) {
  let ticket = BuildNewTicket(req)
  let data = await CreateTicket(ticket);
  EmailUser("admin@ticketdash.co", ticket);
  res.json(data);
});

tickets.put('/:id', async function(req: Request, res: Response) {
  let existingTicket = await ReadTicket(req.params.id)
  let ticket = BuildTicket(req, existingTicket)
  let data = await UpdateTicket(ticket);
  EmailUser("admin@ticketdash.co", ticket);
  res.json(data);
});

module.exports = tickets;

