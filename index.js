const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

client.connect((err) => {
  if (err) {
    console.error('Failed to connect', err.stack);
    process.exit(1);
  } else {
    console.log('Connected to PostgreSQL');
    client.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.error('Failed to execute query', err.stack);
      } else {
        console.log('Server time:', res.rows[0].now);
      }
      client.end();
    });
  }
});
