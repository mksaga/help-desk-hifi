
import { createClient } from '@supabase/supabase-js'
import { Database, Tables } from './supabase_types'
import { Ticket } from './tickets/types'

const supabaseUrl = process.env.SUPABASE_URL || "http://supabase.com"
const supabaseKey = process.env.SUPABASE_KEY || "secret-key"
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// ------------- TICKETS

async function ListTickets() {
  let {data, error} = await supabase.from('tickets').select('*') 
  if (error) {
    throw error;
  }
  return data
}


async function ReadTicket(ticketID: string) {
  const ticketQuery = supabase
    .from('tickets')
    .select('*')
    .eq('id', ticketID)
    .limit(1)

  const { data, error } = await ticketQuery;
  if (data == null) {
    return {
      "id": "",
      "created_at": "",
      "user_name": "",
      "user_email": "",
      "status": "",
      "description": "",
    }
  }
  return data[0]
}

async function CreateTicket(ticket: Ticket) {
  let {data, error} = await supabase.from('tickets').insert(ticket)
  if (error) {
    console.log(error);
    throw error;
  }

  return data
}


async function UpdateTicket(ticket: Ticket) {
  let {data, error} = await supabase.from('tickets').update(ticket).eq('id', ticket.id)
  if (error) {
    console.log(error);
    throw error;
  }

  return data
}

export { ListTickets, CreateTicket, ReadTicket, UpdateTicket };
