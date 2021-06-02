const express= require('express');
const router= express.Router();

// @route  api/posts
// @desc   test route
// @acess  public
router.get('/',(req,res)=>{
    res.send('Posts route');
});


module.exports= router;