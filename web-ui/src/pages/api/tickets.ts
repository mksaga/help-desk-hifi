import type { NextApiRequest, NextApiResponse } from "next"
const axios = require("axios");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Greetings from /api/tickets")
  if (req.method == "POST") {
    console.log("BODYBODY: \n", req.body)
    let axiosRsp = await axios({
      method: "post",
      url: `${process.env.API_BASE_URL}/tickets/`,
      data: req.body,
    })
    console.log("InsideAPITickets: ", axiosRsp.data)
    res.status(200).json(axiosRsp.data)
  }
  if (req.method == "GET") {
    let axiosRsp = await axios({
      method: "get",
      url: `${process.env.API_BASE_URL}/tickets/`,
    })
    res.status(200).json(axiosRsp.data)
  }
}
