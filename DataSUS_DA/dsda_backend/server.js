import express from 'express'
import sql from 'sqlite3'
import cors from 'cors';
import { config } from 'dotenv'
import helmet from 'helmet'

config()
const app = express()
const port = 4000
app.use(helmet())
console.log(process.env.LOCAL_DEV_URL)

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
app.use(cors(corsOptions));
var db_name = process.env.DB_NAME;
var db = new sql.default.Database(db_name, sql.default.OPEN_READWRITE, function (err) {
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
