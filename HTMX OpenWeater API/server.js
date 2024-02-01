import express from "express"
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send('')
})
  
app.get("/weather", async (req, res) => {
    const city = req.query.city
    const apiKey = process.env.API_KEY
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    try {
        const response = await axios.get(APIUrl)
        const temperature = response.data.main.temp
        res.send(`The temperature in ${city} is ${temperature}°C`)
    } catch (error) {
        console.log(error)
        res.send(`Could not find temperature for ${city}`)
    }
})

app.listen(3000, () => {
    console.log(`Server is running on port:3000`)
})