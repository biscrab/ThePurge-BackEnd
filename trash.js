/*
app.get('/user', function(req, res){
    request({url: `https://cravatar.eu/helmhead/dhjmine1023`})
})

function IncreaseLike({params, like}){
    return new Promise((resolve, reject) => {
        const lquery = `Update notice set islike = islike+1 where id=${params}`;
        const dquery = `Update notice set dislike = dislike+1 where id=${params}`;
        const db = mysql.createConnection(config);
        console.log("increase");
        console.log(Number(like))
        db.query(`${Number(like) === 1 ? lquery : dquery}`, function(err, rows){
            if(err){
                console.log(err);
                resolve(false);
            }
            resolve(true);
        })
        db.end();
    })
}

function DecreaseLike({params, like}){
    return new Promise((resolve, reject) => {
        const lquery = `Update notice set islike = islike-1 where id=${params}`;
        const dquery = `Update notice set dislike = dislike-1 where id=${params}`;
        const db = mysql.createConnection(config);
        console.log("decrease");
        console.log(Number(like))
        db.query(`${Number(like) === 1 ? lquery : dquery}`, function(err, rows){
            if(err){
                console.log(err);
                resolve(false);
            }
            resolve(true);
        })
        db.end();
    })
}*/
