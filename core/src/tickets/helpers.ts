import { v4 as uuidv4} from "uuid";
import { Request } from "express";
import { Ticket } from "./types"
import { ReadTicket } from "./repo"



function BuildTicket(req: Request): Ticket {
  const nowTimestamp: Date = new Date();

  console.log(req.body)

  let id = uuidv4();
  let created_at = nowTimestamp.toISOString()
  let status = "new";
  let user_name = req.body.name
  let user_email = req.body.email
  let description = req.body.description

  if (req.method == "PUT") {
    id = req.body.id;
    if (req.body.status != null && req.body.status != "") {
      status = req.body.status
    }
  }

  return {
    "id": id,
    "created_at": created_at,
    "status": status,
    "user_name": user_name,
    "user_email": user_email,
    "description": description,
  }
}

export { BuildTicket }
