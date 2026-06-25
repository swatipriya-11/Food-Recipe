const Recipe = require("../models/recipe.js")
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.json(recipes)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }

}

const getRecipe=async(req,res)=>{
    const recipe=await Recipe.findById(req.params.id)
    res.json(recipe)
}

const addRecipe=async(req,res)=>{
    console.log("USER:",req.user)
    const {title,ingredients,instruction,time}=req.body

    if(!title || !ingredients || !instruction)
    {
       return res.json({message:"Required fields can't be empty"})
    }

    const newRecipe=await Recipe.create({
        title,ingredients,instruction,time,coverImage:req.file?.filename,
        createdBy:req.user.id
    })
    return res.json(newRecipe)
}

const editRecipe=async(req,res)=>{
    const {title,ingredients,instruction,time}=req.body
    let recipe=await Recipe.findById(req.params.id)
    try{
        if(recipe){
            let coverImage=req.file?.filename ?req.file?.filename : recipe.coverImage
            await Recipe.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
            res.json({title,ingredients,instruction,time})
        } 
    }
    catch(err){
        return res.status(404).json({message:"error"})
    }
}
const deleteRecipe=async(req,res)=>{
    try{
      await Recipe.deleteOne({_id:req.params.id})
      res.json({status:"ok"})
    }
    catch(err){
      return res.status(400).json({message:"error"})
    }
}

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}