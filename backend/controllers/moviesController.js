const Favorite = require('../model/fav.js')


const storeFavorite = async (req, res) => {
    try {
        const {Title,Year,Type,Poster } = req.body;

        const myData = new Favorite({ Title,Year,Type,Poster });
        const data = await myData.save();

        return res.status(200).json({
            message:"Favorite Saved successfully",
            status:200,
            data:data
        })
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({
            message:"something went wrong!",
            status:500,
            data:{}
        })
    }
}




const getFavorite = async (req, res) => {
    try {
        // find last five blogs 
        const data = await Favorite.find().sort({_id:-1}).limit(50)
        console.log(data)
        

        
        if (data.length === 0) {
            // if no blog found
            return res.status(200).json({
                message:"No Favorite found",
                status:200,
                data:null
            })    
        }
        

        return res.send(data)
        
        
    } catch (error) {
        console.log("error", error.message);
        return res.status(503).json({
            message:"something went wrong!",
            status:503,
            data:{}
        })
    }
}

const deleteFavorite=async (req,res)=>{
    try {
        const {_id} = req.params;


        const data = await Favorite.findOneAndDelete({_id : _id })
        console.log(data)
        

        
        return res.status(200).json({
            message:"Favorite Deleted successfully",
            status:200,
            data:data
        })
        
        
    } catch (error) {
        console.log("error", error.message);
        return res.status(503).json({
            message:"something went wrong!",
            status:503,
            data:{}
        })
    }
}

module.exports = { storeFavorite, getFavorite, deleteFavorite}