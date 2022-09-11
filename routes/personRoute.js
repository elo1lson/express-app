const router = require('express').Router()
const { translateAliases } = require('../models/Person')
const Person = require('../models/Person')

router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }
    if (!name) return res.status(500).json({ message: 'Nome é um campo obrigatorio' })
    if (!salary) return res.status(500).json({ message: 'Salario é um campo obrigatorio' })
    if (!approved) return res.status(500).json({ message: 'Aprovado é um campo obrigatorio' })
    try {

        await Person.create(person)
        return res.status(201).json({
            message: 'Created user'
        })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})

router.get('/', async (req, res) => {
    try {

        const people = await Person.find()
        return res.status(200).json(people)
    } catch (error) {
        return res.status(500).json({ error: error })
    }

})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const person = await Person.findOne({ _id: id })
        if (!person) {
            res.status(422).json({ message: 'Usuário não encontrado' })
            return
        }
        return res.status(200).json(person)
    } catch (error) {
        return res.status(500).json({ error: error })
    }

})
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { name, salary, approved } = req.body

        const person = {
            name,
            salary,
            approved
        }
        const updatedPerson = await Person.updateOne({ _id: id }, person)
        if (!updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Usuário não encontrado' })
            return
        }
        return res.status(200).json(person)
    } catch (error) {
        return res.status(500).json({ error: error })
    }

})
module.exports = router