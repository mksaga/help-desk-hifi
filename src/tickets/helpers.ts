import { v4 as uuidv4} from "uuid";
import { Request } from "express";
import { Ticket } from "./types"



function BuildTicket(req: Request): Ticket {
  const nowTimestamp: Date = new Date();
  let id = req.params.id;
  if (id == "" || id == null) {
    id = uuidv4();
  }
  
  let status = req.body.status;
  if (status == "" || status == null) {
    status = "new";
  }

  return {
    "id": id,
    "created_at": nowTimestamp.toISOString(),
    "user_name": req.body.name,
    "user_email": req.body.email,
    "status": status,
    "description": req.body.description,
  }
}

export { BuildTicket }
