const express = require('express')
const morgan= require('morgan')
const bodyParser = require('body-parser')
const app = new express()

const productRoute = require('./routes/produtos.js')
const homeRoute = require('./routes/home.js')

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/produtos',productRoute)
app.use('/',homeRoute)

app.use((req, res, next)=>{
	res.header('Acces-Control-Allow-Origin', '*')
	res.header(
		'Acces-Control-Allow-Header',
		 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		)
	if(res.method === 'OPTIONS'){
		res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
		return res.status(200).send({})
	}
	next()
})

app.use((req, res, next)=>{
	const erro = new Error('Não encontrado!')
	erro.status = 404
	next(erro)
})

app.use((error, req, res, next)=>{
	res.status(error.status || 500)
	return res.send({
		erro:{
			message: error.message
		}
	})


})
module.exports = app