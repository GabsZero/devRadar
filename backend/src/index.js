const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

mongoose.connect('mongodb+srv://johnnyredfox:kurtcob123@cluster0-gpxvj.mongodb.net/test?retryWrites=true&w=majority',
{
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.use(express.json()) // é necessário "cadastrar" o json para que o express entenda json chegando
app.use(routes)
app.listen(3333) //setando a porta da aplicação