const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()


app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/bank',require('./routers/bank.router'))

mongoose.connect(`${process.env.DB_URL}`,{useNewUrlParser: true},()=>{
    console.log('conected to DB')
})

app.listen(process.env.PORT ||5001 , ()=>{
    console.log('port 5001')
})