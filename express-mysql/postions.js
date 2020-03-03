module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function servePositions(req, res){
        console.log("You asked me for some Positions?")
        var query = 'SELECT * FROM Positions';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfPositions(error, results, fields){
            console.log(error)
            console.log(results)
            console.log(fields)
            //take the results of that query and store ti inside context
            context.positions = results;
            //pass it to handlebars to put inside a file
            res.render('positions', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfPositions)

        res.send('Here you go!');
    }

    router.get('/', servePositions);
    return router;
}();