module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveGameStats(req, res){
        console.log("You asked me for some gamestats?")
        var query = 'SELECT * FROM GameStatistics';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfGameStats(error, results, fields){
            console.log(error)
            console.log(results)
            console.log(fields)
            //take the results of that query and store ti inside context
            context.gamestats = results;
            //pass it to handlebars to put inside a file
            res.render('gamestats', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfGameStats)

        res.send('Here you go!');
    }

    router.get('/', serveGameStats);
    return router;
}();