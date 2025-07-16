const { getCategory, createCategory, deleteCategory, updateCategory } = require("../controllers/categoryControls")

const router = require("express").Router()

// CRUD OPERATION
// router.get("/category", () => {})
// router.post("/category", () => {})
router.route("/category")
.get(getCategory)
.post(createCategory)

router.route("/category/:id")
.delete(deleteCategory)
.put(updateCategory)

module.exports = router