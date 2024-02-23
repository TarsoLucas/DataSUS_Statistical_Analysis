"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sqlite3_1 = require("sqlite3");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var helmet_1 = require("helmet");
(0, dotenv_1.config)();
var app = (0, express_1.default)();
var port = 4000;
app.use((0, helmet_1.default)());
var whitelist = [process.env.LOCAL_DEV_URL];
var corsOptions = {
    origin: function (origin, callback) {
        if (origin && whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use((0, cors_1.default)(corsOptions));
var db_name = process.env.DB_NAME;
var db = new sqlite3_1.default.Database(db_name, sqlite3_1.default.OPEN_READWRITE, function (err) {
    if (err) {
        console.error('Error opening database:', err.message);
    }
    else {
        console.log('Connected to the database.');
    }
});
app.use(express_1.default.json());
app.get('/casosdeaids', function (req, res) {
    var query = 'SELECT * FROM casos_AIDS';
    db.all(query, function (err, rows) {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            res.json(rows);
        }
    });
});
app.get('/casosdetuberculose', function (req, res) {
    var query = 'SELECT * FROM casos_tuberculose';
    db.all(query, function (err, rows) {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            res.json(rows);
        }
    });
});
app.get('/casosdehanseniase', function (req, res) {
    var query = 'SELECT * FROM casos_hanseniase';
    db.all(query, function (err, rows) {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            res.json(rows);
        }
    });
});
app.get('/notificacoesdecasossuspeitosdesc', function (req, res) {
    var query = 'SELECT * FROM casos_scz';
    db.all(query, function (err, rows) {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            res.json(rows);
        }
    });
});
app.get('/programadecontroledaesquistossomose', function (req, res) {
    var query = 'SELECT * FROM casos_esquistossomose';
    db.all(query, function (err, rows) {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            res.json(rows);
        }
    });
});
app.get('/tempoateoiniciodotratamentooncologic', function (req, res) {
    var query = 'SELECT * FROM tempo_ate_inicio_tratamento_oncologico';
    db.all(query, function (err, rows) {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            res.json(rows);
        }
    });
});
app.listen(port, function () {
    console.log("Server is listening at port ".concat(port));
});
