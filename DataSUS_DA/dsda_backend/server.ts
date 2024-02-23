import express from 'express'
import sql from 'sqlite3'
import cors from 'cors';
import { CorsOptions } from 'cors'
import { config } from 'dotenv'
import helmet from 'helmet'
import { Knex } from 'knex';

config()
const app = express()
const port = 4000
app.use(helmet())

declare module 'knex/types/tables.js' {
  interface User {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
  interface Tables {
    // This is same as specifying `knex<User>('users')`
    users: User;
    // For more advanced types, you can specify separate type
    // for base model, "insert" type and "update" type.
    // But first: notice that if you choose to use this, 
    // the basic typing showed above can be ignored.
    // So, this is like specifying
    //    knex
    //    .insert<{ name: string }>({ name: 'name' })
    //    .into<{ name: string, id: number }>('users')
    users_composite: Knex.CompositeTableType<
      // This interface will be used for return type and 
      // `where`, `having` etc where full type is required 
      User,
      // Specifying "insert" type will also make sure
      // data matches interface in full. Meaning
      // if interface is `{ a: string, b: string }`,
      // `insert({ a: '' })` will complain about missing fields.
      // 
      // For example, this will require only "name" field when inserting
      // and make created_at and updated_at optional.
      // And "id" can't be provided at all.
      // Defaults to "base" type.
      Pick<User, 'name'> & Partial<Pick<User, 'created_at' | 'updated_at'>>,
      // This interface is used for "update()" calls.
      // As opposed to regular specifying interface only once,
      // when specifying separate update interface, user will be
      // required to match it  exactly. So it's recommended to
      // provide partial interfaces for "update". Unless you want to always
      // require some field (e.g., `Partial<User> & { updated_at: string }`
      // will allow updating any field for User but require updated_at to be
      // always provided as well.
      // 
      // For example, this wil allow updating all fields except "id".
      // "id" will still be usable for `where` clauses so
      //      knex('users_composite')
      //      .update({ name: 'name2' })
      //      .where('id', 10)`
      // will still work.
      // Defaults to Partial "insert" type
      Partial<Omit<User, 'id'>>
    >;
  }
}

const whitelist: string[] = [process.env.LOCAL_DEV_URL as string]
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions))

const db_name: string = process.env.DB_NAME!

const db = new sql.Database(db_name, sql.OPEN_READWRITE, (err) => {
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