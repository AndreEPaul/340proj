module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getGames(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Games",
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.games = results;
            complete();
        });
    }

    /*Display all games */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getGames(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('games', context);
            }
        }
    });

    /* Adds a person, redirects to the people page after adding */
/*
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES (?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/people');
            }
        });
    });
*/

    return router;
}();










/*
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

 */