import { 
  ListTickets as SupabaseListTickets,
  ReadTicket as SupabaseReadTicket,
  CreateTicket as SupabaseCreateTicket,
  UpdateTicket as SupabaseUpdateTicket,
} from "../supabase"

import { Tables } from "../supabase_types"
import { Ticket } from './types'

async function ListTickets() {
  let dbTickets: Tables<'tickets'>[] | null = await SupabaseListTickets();
  let domainTickets: Ticket[] = [];
  if (dbTickets == null) {
    return domainTickets
  }
  for (const dbTicket of dbTickets) {
    let domainTicket: Ticket = marshalTicket(dbTicket)
    domainTickets.push(domainTicket)
  }
  return domainTickets
}

async function ReadTicket(ticketID: string): Promise<Ticket> {
  let dbTicket: Tables<'tickets'> = await SupabaseReadTicket(ticketID);
  let domainTicket: Ticket = marshalTicket(dbTicket)
  return domainTicket
}

async function CreateTicket(ticket: Ticket) {
  return await SupabaseCreateTicket(ticket)
}

async function UpdateTicket(ticket: Ticket) {
  return await SupabaseUpdateTicket(ticket)
}

function marshalTicket(ticket: Tables<'tickets'>): Ticket {
  return {
      id: ticket.id,
      created_at: ticket.created_at,
      user_name: ticket.user_name,
      user_email: ticket.user_email,
      description: ticket.description,
      status: ticket.status,
  }
}

export { ReadTicket, ListTickets, CreateTicket, UpdateTicket };
