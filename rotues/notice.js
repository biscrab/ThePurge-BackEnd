import express from 'express';
import config from '../dbconfig.js';
const route = express.Router();
import getUser from '../functions/getUser.js';
import * as N from '../functions/notice.js'

route.route('/')
    .post(async(req, res) => {
        if(!req.headers.authorization){
            res.status(401).send("please login first")
        }
        const user = await getUser(req.headers.authorization.substring(7));
        if(user === "winvvip@gmail.com"){
            const db = mysql.createConnection(config);
            let max = await N.getMax();
            if(max === undefined || null){
                max = 0;
            }
            console.log("max :" + max);
            const sql = `Insert into notice (title, subtitle, date${req.body.img ? ", img" : ""}, id) values ("${req.body.title}", "${req.body.subtitle}", "${req.body.date}"${req.body.img ? `, "${req.body.img}"` : ""}, ${max+1});`;
            db.query(sql, function(err, rows){
                if(!err){
                    res.json(rows);
                }
                else{
                    res.json(err.data);
                }
            })
            db.end();
        }
        else{
            res.status(401).send("you have not authority");
        }   
    })
    .delete('/:id', async(req, res) => {
        if(!req.headers.authorization){
            res.status(401).send("please login first")
        }
        const user = await getUser(req.headers.authorization.substring(7));
        const id = req.params.id;
        if(user == "winvvip@gmail.com"){

            const del = await N.deleteNoticeAll(id);

            if(!del){
                res.status(500).send("server error1");
            }

            const update = await N.updateNotice(id); 

            if(!update){
                res.status(500).send("server error2");
            }

            const db = mysql.createConnection(config);

            db.query(`Delete from notice where id = ${id}`, function(err, rows){
                if(rows){
                    res.json("success");
                }
                else{
                    res.status(400).send('can not found that id');
                }
            })

            db.end();
        }
        else{
            res.status(401).send("you have not authority");
        }
    })
    .patch('/:p', function(req, res){
        const db = mysql.createConnection(config);
        db.query(`Update notice set title=${req.body.title}, subtitle=${req.body.subtitle}, img=${req.body.img}, date=${req.body.date} where id = ${req.params.p}`, function(req, res){
            if(rows){
                res.json(rows)
            }
            else{
                res.status(500).send("error");
            }
        })
        db.end();
    })
    .get('/:p', async(req, res) => {
        let max = await N.getMax();

        var mp, lp;
        var p;

        if(req.params){
            p = Number(req.params.p);
        }
        else{
            p = 1;
        }

        if(p === 1){
            lp = max-4;
            mp = max;
        }
        else{
            lp = max - ((p-1)*5)-4;
            mp = max - ((p-1)*5);
        }

        console.log(lp, mp);

        const rows = await N.getNoticeDB(lp, mp);
        console.log(rows);
        const arr = await N.getArr(rows);

        res.json(arr);
    })

export default route;