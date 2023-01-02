import express from 'express'
import bodyParser from 'body-parser'
import routes from './settings/routes.js'
import cors from 'cors'
// const bodyParser = require('body-parser')
const port = process.env.PORT || 3005
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://127.0.0.1:5501'
}))
routes(app)

app.listen(port, () => {
    console.log('App started on port', port);
})