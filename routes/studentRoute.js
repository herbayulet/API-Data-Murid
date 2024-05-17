// manggil express
const express = require("express");
const {
  getStudents,
  getStudentById,
  createNewStudent,
  editDataStudent,
  hapusDataMurid,
} = require("../controllers/studentController");

// define router
const router = express.Router();

// routes

// GET semua murid
router.get("/getall", getStudents);

// GET murid berdasarkan ID
router.get("/get/:id", getStudentById);

// POST murid baru
router.post("/create", createNewStudent);

// PUT murid baru
router.put("/update/:id", editDataStudent);

// DELETE data murid
router.delete("/hapus/:id", hapusDataMurid);

module.exports = router;
