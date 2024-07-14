'use strict'

import express, { Express, Request, Response, NextFunction } from "express";
import { ReadTicket, ListTickets, CreateTicket, UpdateTicket } from "./repo"
import { BuildTicket } from "./helpers"
import { HydrateTickets } from "./types"
import { Tables } from "../supabase_types"
import { EmailUser } from "../email"

var tickets = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

tickets.get('/', async function(req: Request, res: Response, next: NextFunction) {
  let data = await ListTickets()
  let hydratedTickets = await HydrateTickets(data)
  res.json(hydratedTickets);
});

tickets.get('/:id', async function(req: Request, res: Response, next: NextFunction) {
  let data = await ReadTicket(req.params.id)
  res.json(data)
})


tickets.post('/', upload.none(), async function(req: Request, res: Response) {
  let ticket = BuildTicket(req)
  console.log("BuiltTicket: ", ticket)
  // let data = await CreateTicket(ticket);
  // EmailUser("admin@ticketdash.co", ticket);
  // res.json(data);
});

tickets.put('/:id', async function(req: Request, res: Response) {
  await console.log("PUT /id body: ", req.body)
  let ticket = BuildTicket(req)
  console.log("BuiltTicket: ", ticket)
  let data = await UpdateTicket(ticket);
  EmailUser("admin@ticketdash.co", ticket);
  res.json(data);
});

module.exports = tickets;

