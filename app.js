
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = new express() 

const personRouter = require('./routes/personRoute')

app.use(morgan('dev'))
app.use(
	express.urlencoded({
		extended: true
	}))
app.use(express.json())

app.use('/person', personRouter)

mongoose.connect(process.env.URL)
	.then(() => {
		app.listen(3000, () => {
			console.log('Logado!');
		})
	})
	.catch((e) => console.log(e, 'erro!'))

module.exports = app