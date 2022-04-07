export function getLike(id){
    return new Promise((resolve, reject) => {
        var l = 0;
        var d = 0;
        const db = mysql.createConnection(config);
        db.query(`Select islike from liketable where id = ${id}`, function(err, rows){
            rows.map(i => {
                if(i.islike === 1){
                    l += 1;
                }
                else{
                    d += 1;
                }
            })
            console.log(l, d);
            resolve({like: l, dislike: d});
        })
        db.end();
    })
}

export function getIsLike(id, user){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select * from liketable where id=${id} and name="${user}"`, function(err, rows){
                if(err){
                    resolve("err")
                }
                else{
                    resolve(rows)
                }
            })
        db.end();
    })
} 

export function deleteLike(id, user){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.query(`Delete from liketable where id=${id} and name="${user}"`, function(err, rows){
            if(err){
                console.log(err);
                resolve(false);
            }
            resolve(true);
        })
        db.end();
    })
}

export function InsertLike (id, user, like){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.query(`Insert into liketable (id, name, islike) values (${id}, "${user}", ${like})`, function(err, rows){
            if(err){
                resolve(false);
            }
            resolve(true)
            db.end();
        })
    })
}