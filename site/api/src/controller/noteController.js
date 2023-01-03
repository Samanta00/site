const NoteSchema = require('../models/noteSchema')
const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const SECRET='ellen'

const getAll = async (req, res) => {
    try {
        const notes = await NoteSchema.find()
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

// criar método para cadastrar uma nota 
const createNote = async (req, res) => {
    try {
        const newNote = new NoteSchema({
            username: req.body.username,
            password: req.body.username,
            _id: new mongoose.Types.ObjectId()
        })

        const {author}=req.body
        console.log(author)

        const savedNote = await newNote.save()
        res.status(200).json({
            message: "Nota adicionada com sucesso! (:",
            savedNote
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const teste=(req,res)=>{
    const {name,senha} =req.body

    if(name==='ellen' && senha==='123'){
       const token = jwt.sign({userId:1},SECRET,{expiresIn:300});
        return res.json({auth:true,token})
    }
    res.status(401).end()
}


// criar método para atualizar informações de uma nota
const updateNoteById = async (req, res) => {
    try {
        const findNote = await NoteSchema.findById(req.params.id)
        console.log(findNote)

        if (findNote) {            
            findNote.author = req.body.author || findNote.author
            findNote.title = req.body.title || findNote.title
        }

        const savedNote = await findNote.save()
        console.log('APÓS ATUALIZAÇÃO', savedNote)

        res.status(200).json({
            message: "Nota atualizada com sucesso!!!!",
            savedNote
        })

    } catch (error) {
        
    }
}

const deleteNoteById = async (req, res) => {
    try {
        const noteFound = await NoteSchema.findById(req.params.id)

       await noteFound.delete()

       res.status(200).json({
           mensagem: `Nota '${noteFound.title}' deletada com sucesso!`
       })

    } catch (err) {
        res.status(400).json({
            mensagem: err.message
        })
    }
}

module.exports = {
    getAll,
    createNote,
    teste,
    updateNoteById, 
    deleteNoteById
}