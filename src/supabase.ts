
import { createClient } from '@supabase/supabase-js'
import { Database, Tables } from './supabase_types'

const supabaseUrl = process.env.SUPABASE_URL || "http://supabase.com"
const supabaseKey = process.env.SUPABASE_KEY || "secret-key"
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

async function ListTickets() {
  let {data, error} = await supabase.from('tickets').select('*') 
  if (error) {
    throw error;
  }
  return data
}

export { ListTickets };
