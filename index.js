const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())

const cors = require('cors')

app.use(cors({ origin: true }))

require('dotenv').config()

const port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Welcome to the Crypto Verse Backend API')
})

const headers = {
    'x-access-token': process.env.API_KEY
}

app.get('/coins', async (req, res) => {

  const url = process.env.BASE_URL + '/coins?limit=100'

  const response = await axios.get(url, {headers}).then(response => response.data).catch(error => console.log(error))

  res.send(
    response
  )
})

app.get(`/coins/:coinId`, async (req, res) => {

  const coinId = req.params.coinId

  const baseUrl = process.env.BASE_URL

  const url = `${baseUrl}/coin/${coinId}`

  const response = await axios.get(url, {headers}).then(response => response.data).catch(error => console.log(error))

  res.send(
    response
  )
})


app.listen(port, () => console.log(`Server is running on port ${port}`))
