const express = require('express')
const morgan= require('morgan')
const bodyparser = require('body-parser')
const app = new express()

const productRoute = require('./routes/produtos.js')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json)

app.use('/produtos',productRoute)

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