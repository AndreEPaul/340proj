module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getTeams(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Teams",
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.teams = results;
                complete();
            });
    }

    /*Display all Teams */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('teams', context);
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
