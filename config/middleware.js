module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('err'),
    }

    next(); //important to write this otherwise it will not got to next and stucked at first place only.
}