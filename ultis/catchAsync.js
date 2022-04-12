module.exports = fun => {
    return( req, res, next) => {
        fun(req, res, next).catch(next);
    }
}

//this works by using func as param then making new func thencalling new one and catch error