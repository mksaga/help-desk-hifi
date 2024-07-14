import type { NextApiRequest, NextApiResponse } from "next"
const axios = require("axios");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let apiURL = process.env.API_BASE_URL
  if (apiURL == null) {
    apiURL = "https://help-desk-hifi.onrender.com/"
  }

  if (req.method == "POST") {
    let axiosRsp = await axios({
      method: "post",
      mode: 'no-cors',
      url: `${apiURL}/tickets/`,
      data: req.body,
    })

    res.status(200).json(axiosRsp.data)
  }
  if (req.method == "GET") {
    let axiosRsp = await axios({
      method: "get",
      url: `${apiURL}/tickets/`,
    })
    res.status(200).json(axiosRsp.data)
  }
}
