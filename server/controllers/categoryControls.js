const categoryModel = require("../models/category.model")

const categoryControls = {
    getCategory : async (req, res) => {
        try {
            const category = await categoryModel.find({})
        if(!category) 
            return res.status(400).json({status : false, msg : "No category found"})
        res.status(200).json(category)
        } catch (err) {
            res.status(500).json({status : false, msg : err.message})
        }
    },
    createCategory : async (req, res) => {},
    deleteCategory : async (req, res) => {},
    updateCategory : async (req, res) => {}
}

module.exports = categoryControls