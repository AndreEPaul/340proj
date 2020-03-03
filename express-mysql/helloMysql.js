var express = require('express');
var mysql = require('./views/dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7117);

app.use(express.static('public'));

app.get('/', function(req,res,next){
    context = {};
    res.render('index', context);
});

app.get('/index', function(req,res,next){
  context = {};
  res.render('index', context);
});

app.get('/games',function(req,res,next){
  var display = {};
  mysql.pool.query('SELECT * FROM Games', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    display.results = rows;
    res.render('games', display);
  });
/*
  var toAdd = {};
  mysql.pool.query("INSERT INTO Games (`date`, `location`, `team1Points`, `team2Points`, `team1ID`, `team2ID`) VALUES (?, ?, ?, ?, ?, ?)",
      [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    toAdd.results = "Inserted id " + result.insertId;
    res.render('games',toAdd);
  });
*/
});


app.get('/gamestats',function(req,res,next){
  var display = {};
  mysql.pool.query('SELECT * FROM GameStatistics',
      function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    display.results = JSON.stringify(rows);
    res.render('gamestats', display);
  });
/*
  var toAdd = {};
  mysql.pool.query("INSERT INTO GameStats (`points`, `assists`, `rebounds`, `steals`, `blocks`, `plusMinus`, `playerID`, `gameID`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [req.query.c], function(err, result){
        if(err){
          next(err);
          return;
        }
        toAdd.results = "Inserted id " + result.insertId;
        res.render('gamestats',toAdd);
      });
 */
});

app.get('/players',function(req,res,next){
  var display = {};
  mysql.pool.query('SELECT * FROM Players', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    display.results = JSON.stringify(rows);
    res.render('players', display);
  });
/*
  var toAdd = {};
  mysql.pool.query("INSERT INTO Games (`height`, `weight`, `lastName`, `firstName`, `teamID`) VALUES (?, ?, ?, ?, ?)",
      [req.query.c], function(err, result){
        if(err){
          next(err);
          return;
        }
        toAdd.results = "Inserted id " + result.insertId;
        res.render('players',toAdd);
      });
 */
});

app.get('/players_positions',function(req,res,next){
  var display = {};
  mysql.pool.query('SELECT * FROM Players_Positions', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    display.results = JSON.stringify(rows);
    res.render('players_positions', display);
  });
/*
  var toAdd = {};
  mysql.pool.query("INSERT INTO Players_Positions (`plID`, `poID`) VALUES (?, ?)",
      [req.query.c], function(err, result){
        if(err){
          next(err);
          return;
        }
        toAdd.results = "Inserted id " + result.insertId;
        res.render('Players_Positions',toAdd);
      });
 */
});

app.get('/positions',function(req,res,next){
  var display = {};
  mysql.pool.query('SELECT * FROM Positions', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    display.results = JSON.stringify(rows);
    res.render('positions', display);
  });
/*
  var toAdd = {};
  mysql.pool.query("INSERT INTO Positions (`positionName`) VALUES (?)",
      [req.query.c], function(err, result){
        if(err){
          next(err);
          return;
        }
        toAdd.results = "Inserted id " + result.insertId;
        res.render('positions',toAdd);
      });
 */
});

app.get('/teams',function(req,res,next){
  var display = {};
  mysql.pool.query('SELECT * FROM Teams', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    display.results = JSON.stringify(rows);
    res.render('teams', display);
  });
/*
  var toAdd = {};
  mysql.pool.query("INSERT INTO Teams (`teamName`, `homeCourt`) VALUES (?, ?)",
      [req.query.c], function(err, result){
        if(err){
          next(err);
          return;
        }
        toAdd.results = "Inserted id " + result.insertId;
        res.render('teams',toAdd);
      });
 */
});

// ADD DELETE FUNCTIONALITY LATER
/*
app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home',context);
  });
});
*/
// ADD UPDATE FUNCTIONALITY LATER
/*
///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
app.get('/simple-update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
    [req.query.name, req.query.done, req.query.due, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});
*/

// ADD UPDATE FUNCTIONALITY LATER
/*
///safe-update?id=1&name=The+Task&done=false
app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});
*/

// This is from the class example. Do we need this for our tables?
/*
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS todo", function(err){
    var createString = "CREATE TABLE todo(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "done BOOLEAN," +
    "due DATE)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});
*/

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
