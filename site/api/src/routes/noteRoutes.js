const express = require("express")
const router = express.Router()

const controller = require("../controller/noteController")

// DEMANDA: visualizar todas as notas cadastradas
router.get("/all", controller.getAll)

// DEMANDA: cadastrar nota
router.post("/create", controller.createNote)

router.post('/teste', controller.teste)

// DEMANDA: atualizar uma nota
router.patch("/update/:id", controller.updateNoteById)

// DEMANDA: excluir uma nota
router.delete("/delete/:id", controller.deleteNoteById)

module.exports = router