
import type { NextApiRequest, NextApiResponse } from "next"
const axios = require("axios");


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Greetings from /api/ticket/slug")
  if (req.method == "GET") {
    let axiosRsp = await axios({
      method: "get",
      url: `${process.env.API_BASE_URL}/tickets/${req.query.id}`,
    })
    res.status(200).json(axiosRsp.data)
  }
}
