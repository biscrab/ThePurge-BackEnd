import express from 'express';
import config from '../dbconfig.js';
const route = express.Router();
import getUser from '../functions/getUser.js';
import * as R from '../functions/reservation.js'

route.route('/')
    .post(async(req, res) => {
    
        if(!req.headers.authorization){
            res.status(401).send("please login first")
        }

        const name = await R.getMinecraftUser(req.body.name);
        if(name === false){
            res.status(401).send("please insert username");
        }

        if(name !== false){
            let email = await getUser(req.headers.authorization.substring(7)); 

            if(!email)
                res.status(401).send('please login first')

            let getEmail = await R.getReservationEmail(req.body.email);

            if(getEmail)
                res.status(400).send('lt is already reservated eamil')

            let getName = await R.getReservationName(email);

            if(getName)
                res.status(400).send('lt is already reservated name')

            const db = mysql.createConnection(config);

            db.query(`Insert into reservation (name, email) values ("${req.body.name}", "${email}")`, function(err, rows){
                if(rows){
                    res.json("success")
                }
                else if(err){
                    res.status(500).send('error')
                }
            })
            db.end();
        }
        else{
            res.status(400).send('can not found that user')
        }
    })

    .get(function(req, res){
        const db = mysql.createConnection(config);
        db.query(`Select * from reservation`, function(err, rows){
            res.json(rows);
        })
        db.end();
    })

route.get('/:name', async(req, res) => {
    let getname = await R.getReservationName(req.params.name);
    res.json(getname);
})

export default route;