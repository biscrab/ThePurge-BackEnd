export function getMax(){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.query('Select Max(id) from notice', function(err, rows){
            var max = rows[0];
            resolve(max[Object.keys(max)[0]]);
        })
        db.end();
    })
}

export function deleteNoticeAll(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Delete from liketable where id = ${id}`, function(err, rows){
                if(err)
                    resolve(false)
                else
                    resolve(true)
            });
        db.end();
    })
}

export function updateNotice(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Update notice set id = id - 1 where id > ${id}`, function(err, rows){
                if(err)
                    resolve(false)
                else
                    resolve(true)
            })
        db.end();
    })
}

export function getNoticeDB(lp, mp){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`SELECT * from notice where id >= ${lp} and id <= ${mp} order by id desc `, function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}

export async function getArr(rows){
    return Promise.all(rows.map(async (i) => {
        const l = await getLike(i.id);
        console.log(l);
        return({...i, like: l.like, dislike: l.dislike})
    }))
}