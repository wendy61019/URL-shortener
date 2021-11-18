const express = require("express")
const { engine } = require('express-handlebars')
const routes = require('./routes')

require("./config/mongoose")

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", engine({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')
app.set("views", "./views")
app.use(express.static("public"))

app.use(routes)

app.listen(port, () => {
    console.log(`URL Shortener is listening on http://localhost:${port}`)
})