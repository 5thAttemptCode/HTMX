import express from "express"

const app = express()

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

//Handle GET
app.get("/users", async (req, res) =>  {
    // const users = [
    //     {id: 1, name: "Henry Wilkens"},
    //     {id: 2, name: "Dory Smith"},
    //     {id: 3, name: "Eva Mendoza"},
    // ]

    setTimeout(async () => {
        const limit = +req.query.limit || 10

        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
        const users = await response.json()
    
        res.send(`
            <h1 class="text-2xl font-bold my-4">Users</h1>
            <ul>
                ${users.map((user) => `<li>${user.name}</li>`).join("")}
            </ul>
        `)
    }, 2000)

})

//Handle POST
app.post("/convert", (req, res) => {
    setTimeout(() => {
        const fahrenheit = parseFloat(req.body.fahrenheit)
        const celcius = (fahrenheit - 32) * (5 / 9)

        res.send(`
            <p>
                ${fahrenheit} degrees Fahrenheit is equal to ${celcius.toFixed(1)} degrees Celcius
            </p>
        `)
    }, 2000)
})


let counter = 0
//Handle GET for polling
app.get("/poll" , (req, res) => {
    counter++
    const data = {value: counter}

    res.json(data)
})


let currentTemperature = 20

app.get("/get-temperature", (req, res) => {
    currentTemperature += Math.random() * 2 - 1
    res.send(currentTemperature.toFixed(1) + "°C")
})


const contacts = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Doe', email: 'jane@example.com' },
    { name: 'Alice Smith', email: 'alice@example.com' },
    { name: 'Bob Williams', email: 'bob@example.com' },
    { name: 'Mary Harris', email: 'mary@example.com' },
    { name: 'David Mitchell', email: 'david@example.com' },
]

//Handle POST for user search
app.post("/search", (req, res) => {
    const searchTerm = req-body.search.toLowerCase()

    if(!searchTerm){
        return res.send("<tr></tr>")
    }

    const searchResults = contacts.filter((contact) => {
        const name = contact.name.toLowerCase()
        const email = contact.email.toLowerCase()

        return name.includes(searchTerm) || email.includes(searchTerm)
    })

    setTimeout(() => {
        const searchResultHtml = searchResults.map((contact) => `
        <tr>
            <td><div class="my-4 p-2">${contact.name}</div></td>
            <td><div class="my-4 p-2">${contact.email}</div></td>
        </tr>
        `).join("")

        res.send(searchResultHtml)
    }, 1000)
})

app.listen(3000, () => {
    console.log(`Server is running on port:3000`)
})