import { 
  ListTickets as SupabaseListTickets,
  ReadUser as SupabaseReadUser,
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
    let domainTicket: Ticket = {
      id: dbTicket.id,
      created_at: dbTicket.created_at,
      user_name: dbTicket.user_name,
      user_email: dbTicket.user_email,
      description: dbTicket.description,
      status: dbTicket.status,
    }
    domainTickets.push(domainTicket)
  }
  return domainTickets
}

async function ReadUser(userID: string) {
  return await SupabaseReadUser(userID)
}

async function CreateTicket(ticket: Ticket) {
  return await SupabaseCreateTicket(ticket)
}


export { ListTickets, CreateTicket, ReadUser };
