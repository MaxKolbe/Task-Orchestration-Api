import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';

dotenv.config({
  path: '../../.env',
});

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

pool.on('error', () => {
  console.log('Error Connecting to the database Pool');
});

await pool.query('SELECT 1');
console.log('Database connected successfully');

const db = drizzle(pool);

export default db;

// For connection with pg database url e.g. Neon
/* const db = drizzle(process.env.DATABASE_URL); */

// Where a database url would resemble-
/*
postgresql://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/dbname
             └──┘ └───────┘ └─────────────────────────────────────────────┘ └────┘
              ʌ    ʌ          ʌ                                              ʌ
        role -│    │          │- hostname                                    │- database
                   │
                   │- password
*/
