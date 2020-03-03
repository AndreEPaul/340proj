module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function servePlayers_Positions(req, res){
        console.log("You asked me for some Players_Positions?")
        var query = 'SELECT * FROM Players_Positions';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfPlayers_Positions(error, results, fields){
            console.log(error)
            console.log(results)
            console.log(fields)
            //take the results of that query and store ti inside context
            context.players_positions = results;
            //pass it to handlebars to put inside a file
            res.render('players_positions', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfPlayers_Positions)

        res.send('Here you go!');
    }

    router.get('/', servePlayers_Positions);
    return router;
}();