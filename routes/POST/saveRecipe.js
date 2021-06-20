const saveRecipe = require("express").Router();
const recipe = require("../../models/receipt");

saveRecipe.post("/save-recipe", async (req,res) => {
    const {nazevReceptu, popis, dobaPripravy, nahledovyObrazek, suroviny,  fullText} = req.body;
    const ulozeniReceptu = new recipe({
        nazevReceptu, popis, dobaPripravy, nahledovyObrazek, suroviny,  fullText
    });

    try {
      const data = await recipe.findOne({"recipeName":nazevReceptu});

      if (data) {
        return res.json({
          msg: "Drink s tímto jménem už existuje, zadejte odlišný název"
        });
      }

      const {_id} = await ulozeniReceptu.save();

      if (_id) {
        return res.json({
          msg:"Drink byl uložen"
        });
      }

      return res.json({
        msg:"Drink byl uložen"
      });
    } catch (error) {
      res.json({msg: 'neznámá chyba'});
    }
    
});
saveRecipe.get("/save-recipe", (req,res) => {
  res.send("Navštívil jsi /save-recipe GETEM")
})

module.exports = saveRecipe;