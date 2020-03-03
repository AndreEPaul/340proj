module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPlayers(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Players",
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.players = results;
                complete();
            });
    }

    /*Display all Players */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('players', context);
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