import express from 'express'

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post("/convert", (req, res) => {
  setTimeout(() => {
    const inch = parseFloat(req.body.inch)
    const cm = (inch * 2.54)

    res.send(`
      <p>
        ${inch} inches is equal to ${cm.toFixed(1)} cm
      </p>
    `)
  }, 500)
})


app.listen(3000, () => {
  console.log('Server listening on port 3000')
})