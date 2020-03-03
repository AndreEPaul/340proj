module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveGames(req, res){
        console.log("You asked me for some games?")
        var query = 'SELECT * FROM Games';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfGames(error, results, fields){
            console.log(error)
            console.log(results)
            console.log(fields)
            //take the results of that query and store ti inside context
            context.games = results;
            //pass it to handlebars to put inside a file
            res.render('games', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfGames)

        res.send('Here you go!');
    }

    router.get('/', serveGames);
    return router;
}();