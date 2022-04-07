import express from 'express';
const app = express();
import mysql from 'mysql';
import cors from 'cors';
import config from './dbconfig.js'
app.use(cors());

import dislike from './rotues/dislike.js';
import like from './rotues/like.js';
import notice from './rotues/notice.js';
import reservation from './rotues/reservation.js';

app.use('/dislike', dislike);
app.use('/like', like);
app.use('/notice', notice);
app.use('/reservation', reservation);

app.get('/', function(req, res){
    const db = mysql.createConnection(config);
    db.query('Select Max(id) from notice', function(err, rows){
        var max = rows[0];
        res.json(max[Object.keys(max)[0]]);
    })
    db.end();
})

app.get('/pages', async(req, res) => {
    let max = await getMax();
    res.json(Math.ceil((max+1)/5));
})

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});

