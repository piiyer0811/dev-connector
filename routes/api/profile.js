const express= require('express');
const router= express.Router();

// @route  api/profile
// @desc   test route
// @acess  public
router.get('/',(req,res)=>{
    res.send('Profile route');
});


module.exports= router;