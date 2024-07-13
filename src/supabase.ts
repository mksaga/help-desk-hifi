
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

async function CreateTicket(ticket: Ticket) {
  let {data, error} = await supabase.from('tickets').insert(ticket)
  if (error) {
    throw error;
  }

  return data
}


// ------------- USER

async function ReadUser(userID: string) {
  // let {data, error} = await supabase
  const userQuery = supabase
    .from('users')
    .select('*')
    .eq('id', userID)
    .limit(1)

  const { data, error } = await userQuery;
  return data
}

export { ListTickets, CreateTicket, ReadUser };
