import express from 'express';
import config from '../dbconfig.js';
const route = express.Router();
import getUser from '../functions/getUser.js';
import * as L from '../functions/like.js'

route.route('/:id')
    .post(async(req, res) => {
        if(!req.headers.authorization){
            res.status(401).send("please login first")
        }
        let user = await getUser(req.headers.authorization.substring(7));
        var id = Number(req.params.id);
        if(user){
            let like = await L.getIsLike(id, user);
            if(like === "err"){
                res.status(500).send("error")
            }
            else{
                if(like.length !== 0){
                    console.log("number : " + Number(like[0].islike));
                    let del = await L.deleteLike(id, user);
                    console.log("t");
                    console.log(del);
                }
                else{
                    let ilike = await L.InsertLike(id, user, 1);
                    if(!ilike){
                        res.status(500).send("error")
                    }
                }
                res.json("success");
            }
        }
        else{
            res.status(401).send("please login first")
        }
    })
    .get(async(req, res) => {
        if(!req.headers.authorization){
            res.status(401).send("please login first")
        }
        let user = await getUser(req.headers.authorization.substring(7));
        if(user){
            const db = mysql.createConnection(config);
            db.query(`Select islike from liketable where id=${req.params.id} and name="${user}"`, function(err, rows){
                if(err){
                    res.status(500).send("error")
                }
                else if(rows.length){
                    let value = rows[0]; 
                    res.json(Number(value[Object.keys(value)[0]]));
                }
                else{
                    res.json(0);
                }
            })
            db.end();
        }
        else{
            res.status(401).send("please login first");
        }
    })

export default route;