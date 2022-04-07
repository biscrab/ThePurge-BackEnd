import express from 'express';
const app =  express();
import getUser from '../functions/getUser.js';

app.post('/:id', async(req, res)=>{
    if(!req.headers.authorization){
        res.status(401).send("please login first")
    }
    let user = await getUser(req.headers.authorization.substring(7));
    var id = Number(req.params.id);
    if(user){
        let like = await getIsLike(id, user);
        if(like === "err"){
            res.status(500).send("error")
        }
        else{
            if(like.length !== 0){
                console.log("number : " + Number(like[0].islike));
                let del = await deleteLike(id, user);
            }
            else{
                let ilike = await InsertLike(id, user, -1);
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

export default app;