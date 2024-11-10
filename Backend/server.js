import { configDotenv } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';

configDotenv();

const { Client } = pkg;

const client = new Client({
    host: process.env.POSTGRE_HOST,
    port: process.env.POSTGRE_PORT,
    user: process.env.POSTGRE_USERNAME,
    password: process.env.POSTGRE_PASSWORD,
    database: process.env.POSTGRE_DATABASE
});

await client
    .connect()
    .then(() => console.log('[Info] Connected to Postgre Server'))
    .catch((err) => console.error('[Error] Connecting to Postgre Server\n', err));

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/get-forms', async (req, res) => {
    try {
        const query = await client.query('SELECT * FROM customer_forms');

        res.status(200).json({
            status: 200,
            rows: query.rows
        });
    } catch (err) {
        console.error('[Error] POST /new-form\n', err);
        res.status(500).json({
            status: 500,
            msg: 'Internal server error'
        });
    }
});

app.post('/new-form', async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            date_of_birth,
            country,
            profession,
            years_in_profession
        } = req.body;

        if (!first_name || !last_name || !date_of_birth || !country) {
            res.status(400).json({
                status: 400,
                msg: 'Missing required fields'
            });
        }

        let queryString = `INSERT INTO customer_forms (
            first_name, last_name, date_of_birth, country, profession, years_in_profession
        ) VALUES ($1, $2, $3, $4, $5, $6)`;

        let queryValues = [first_name, last_name, date_of_birth, country, profession, years_in_profession];

        let query = await client.query(queryString, queryValues);

        res.status(200).json({
            status: 200,
            msg: 'Form updated successfully'
        });
    } catch (err) {
        console.error('[Error] POST /new-form\n', err);
        res.status(500).json({
            status: 500,
            msg: 'Internal server error'
        });
    }
})

app.listen(3000, () => {
    console.log('[Info] Listening on port 3000');
})