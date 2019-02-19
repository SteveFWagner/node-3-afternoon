const swag=require('../models/swag')

module.exports={
    search: (req,res,next)=>{
        const {category} = req.query

        let catCheck = swag.find(swag => swag.category == category)

        if(!catCheck){
            res.status(200).send(swag)
        }else {
            const swagCat = swag.filter(swag=> swag.category === category)
            res.status(200).send(swagCat)
        }
        
    }
}