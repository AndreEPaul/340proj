module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function servePlayers(req, res){
        console.log("You asked me for some Players?")
        var query = 'SELECT * FROM Players';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfPlayers(error, results, fields){
            console.log(error)
            console.log(results)
            console.log(fields)
            //take the results of that query and store ti inside context
            context.players = results;
            //pass it to handlebars to put inside a file
            res.render('players', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfPlayers)

        res.send('Here you go!');
    }

    router.get('/', servePlayers);
    return router;
}();