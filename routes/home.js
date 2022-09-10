const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
	res.status(200).send({message:'hello!'})
})

router.post('/', (req, res)=>{
	res.status(200).send({message:'post!'})
})

module.exports = router