const News = require('../models/news')

const createNews = async (req, res) => {
   const { title, desc, design } = req.body;
    try {
         const news = await News.create({
            title, 
            desc, 
            design,
            expiresAt: new Date(Date.now() + 1 * 500) 
        });
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getNews = async (req,res)=>{
    try{
        const newsData = await News.find();
        res.status(200).json(newsData) 
    }
    catch{
        res.status(400).json({ error: error.message });
    }
}


// get single record
const getSinglenews = async (req, res) => {
    const { id } = req.params;
    const news = await News.findById({ _id: id });
    if (!news) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json( news );
};


module.exports = { 
    createNews,
    getNews,
    getSinglenews,
    // deleteBlog,
    // updateBlog,
}