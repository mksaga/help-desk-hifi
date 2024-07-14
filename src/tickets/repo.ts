import { 
  ListTickets as SupabaseListTickets,
  ReadTicket as SupabaseReadTicket,
  CreateTicket as SupabaseCreateTicket
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

async function ReadTicket(ticketID: string) {
  let dbTicket: Tables<'tickets'> | null = await SupabaseReadTicket(ticketID);
  if (dbTicket == null) {
    return {}
  }
  let domainTicket: Ticket = marshalTicket(dbTicket)
  return domainTicket
}

async function CreateTicket(ticket: Ticket) {
  return await SupabaseCreateTicket(ticket)
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

export { ReadTicket, ListTickets, CreateTicket };
