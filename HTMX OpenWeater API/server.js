import express from "express";
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send('')
});
  
app.get("/weather", async (req, res) => {
    const city = req.query.city
    const apiKey = process.env.API_KEY
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},uk&APPID=${apiKey}`
    try {
        const response = await axios.get(APIUrl)
        res.setHeader('Content-Type', 'text/html')
        res.send(`<div>Weather: ${response.data.weather[0].main}</div>`)
    } catch (error) {
        res.setHeader('Content-Type', 'text/html')
        res.send(`<div>${city}</div>`)
        console.log(error)
    }
});

app.listen(3000, () => {
    console.log(`Server is running on port:3000`)
});