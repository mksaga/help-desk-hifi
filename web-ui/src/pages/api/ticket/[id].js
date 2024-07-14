
const axios = require("axios");


export default async function handler(req, res) {
  let apiURL = process.env.API_BASE_URL
  if (apiURL == null) {
    apiURL = "https://help-desk-hifi.onrender.com"
  }
  if (req.method == "GET") {
    let axiosRsp = await axios({
      method: "get",
      mode: 'no-cors',
      url: `${apiURL}/tickets/${req.query.id}`,
    })
    res.status(200).json(axiosRsp.data)
  }
}
