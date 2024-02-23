import express from 'express'
import sql from 'sqlite3'
import cors from 'cors'
import { config } from 'dotenv'
import helmet from 'helmet'

config()
const app = express()
const port = 4000
app.use(cors(corsOptions))
app.use(helmet())

var whitelist = [process.env.LOCAL_DEV_URL]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const db = new sql.Database(process.env.DB_NAME, sql.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message)
  } else {
    console.log('Connected to the database.')
  }
});

app.use(express.json())

app.get('/casosdeaids', (req, res) => {
  const query = 'SELECT * FROM casos_AIDS'
  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message)
      res.status(500).json({ error: 'Internal server error' })
    } else {
      res.json(rows)
    }
  });
});

app.get('/casosdetuberculose', (req, res) => {
  const query = 'SELECT * FROM casos_tuberculose'
  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Internal server error' })
    } else {
      res.json(rows)
    }
  });
});

app.get('/casosdehanseniase', (req, res) => {
  const query = 'SELECT * FROM casos_hanseniase'
  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message)
      res.status(500).json({ error: 'Internal server error' })
    } else {
      res.json(rows)
    }
  });
});


app.get('/notificacoesdecasossuspeitosdesc', (req, res) => {
  const query = 'SELECT * FROM casos_scz';
  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message)
      res.status(500).json({ error: 'Internal server error' })
    } else {
      res.json(rows)
    }
  });
});


app.get('/programadecontroledaesquistossomose', (req, res) => {
  const query = 'SELECT * FROM casos_esquistossomose'
  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message)
      res.status(500).json({ error: 'Internal server error' })
    } else {
      res.json(rows)
    }
  });
});


app.get('/tempoateoiniciodotratamentooncologic', (req, res) => {
  const query = 'SELECT * FROM tempo_ate_inicio_tratamento_oncologico';
  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Internal server error' })
    } else {
      res.json(rows)
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
});