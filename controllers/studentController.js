const db = require("../config/db");

// fungsi manggi semua list murid
const getStudents = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM students");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Tidak ada murid",
      });
    }
    res.status(200).send({
      success: true,
      message: "Berhasil ciyee",
      totalMurid: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error.toString());
    return res.status(500).send({
      success: false,
      message: "Gagal mendapatkan list murid",
      error,
    });
  }
};

// fungsi manggil muird by id
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: `Invalid murid dengan ID ${studentId}`,
      });
    }
    const data = await db.query(`SELECT * FROM students WHERE id=?`, [
      studentId,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: `Gak ada murid dengan ID ${studentId}`,
      });
    }
    res.status(200).send({
      success: false,
      message: `Ada nih murid dengan ID ${studentId}`,
      detailMurid: data[0],
    });
  } catch (error) {
    console.log(error.toString());
    return res.status(500).send({
      success: false,
      message: "Gagal mendapatkan murid",
      error,
    });
  }
};

// fungsi buat murid baru
const createNewStudent = async (req, res) => {
  try {
    const { name, roll_no, fees, medium } = req.body;
    if (!name || !roll_no || !fees || !medium) {
      return res.status(500).send({
        success: false,
        message: "Mohon di isi semua field nya",
      });
    }
    const data = await db.query(
      `INSERT INTO students (name, roll_no, fees, medium) VALUES(? , ? , ? , ? )`,
      [name, roll_no, fees, medium]
    );

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Gagal dalam insert query nya",
      });
    }
    res.status(201).send({
      success: true,
      message: "Berhasil daftarin murid baru",
      data,
    });
  } catch (error) {
    console.log(error.toString());
    return res.status(500).send({
      success: false,
      message: "Gagal daftarin murid baru",
      error,
    });
  }
};

const editDataStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: `Invalid murid dengan ID ${studentId}`,
      });
    }
    const { name, roll_no, fees, medium } = req.body;
    const data = await db.query(
      `UPDATE students SET name = ?, roll_no = ?, fees = ?, medium = ? WHERE id = ?`,
      [name, roll_no, fees, medium, studentId]
    );
    if (!data) {
      return res.status(500).send({
        success: false,
        message: "Gagal dalam update data murid",
      });
    }
    res.status(201).send({
      success: true,
      message: "Berhasil update murid",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error update API murid",
      error,
    });
  }
};

const hapusDataMurid = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: `Invalid murid dengan ID ${studentId}`,
      });
    }
    const data = await db.query(`DELETE FROM students WHERE id = ?`, [
      studentId,
    ]);
    res.status(200).send({
      success: true,
      message: `Berhasil hapus data murid dengan ID ${studentId}`,
    });
  } catch (error) {}
};

module.exports = {
  getStudents,
  getStudentById,
  createNewStudent,
  editDataStudent,
  hapusDataMurid,
};
